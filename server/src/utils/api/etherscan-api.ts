import type { dbTransaction } from '../../db/models/Transaction';
import type { BlockApiResponse, Transaction } from '../../typedef';

// axios problem, allows only to import with
const axios = require('axios');

enum BlockActions {
  getLastBlock = 'eth_blockNumber',
  getBlockByNumber = 'eth_getBlockByNumber'
}

export class EtherScan {
  public etherScanAxiosInstance;
  private apiKey;

  constructor() {
    this.etherScanAxiosInstance = axios.create({
      baseURL: 'https://api.etherscan.io/api'
    });
    this.apiKey = process.env.ETHER_API_TOKEN;
  }

  async getBlockReq(params: { tag?: string | number; boolean?: boolean; action: BlockActions }) {
    return await this.etherScanAxiosInstance.get('', {
      params: {
        module: 'proxy',
        apiKey: this.apiKey,
        ...params
      }
    });
  }

  async getLastBlock(): Promise<{ id: number; result: string }> {
    const result = await this.getBlockReq({ action: BlockActions.getLastBlock });
    return result.data;
  }

  async getBlockByItsNumber(blockNum: string | number): Promise<BlockApiResponse> {
    const result = await this.getBlockReq({
      action: BlockActions.getBlockByNumber,
      tag: blockNum,
      boolean: true
    });
    return result.data;
  }

  transformApiResponseForDb(transactions: Transaction[], timestamp: string) {
    const transactionsArr: dbTransaction[] = [];

    for (const transaction of transactions) {
      const {
        gas,
        gasPrice,
        maxPriorityFeePerGas,
        from,
        to,
        blockNumber,
        hash,
        value: gweiValue
      } = transaction;
      const fee =
        Number(gas) *
        (this.getEthNumber(gasPrice) +
          (maxPriorityFeePerGas ? this.getEthNumber(maxPriorityFeePerGas) : 0));

      const value = this.getEthNumber(gweiValue);

      transactionsArr.push({
        from,
        to,
        blockNumber,
        hash,
        value,
        fee,
        timestamp,
        confirmations: 1
      });
    }

    return transactionsArr;
  }

  getEthNumber(hexNum: string | number) {
    // Value from api is in gwei, which is 10^-9 * ETH
    return Number(hexNum) * Math.pow(10, -18);
  }
}

export const EtherScanInstance = new EtherScan();
