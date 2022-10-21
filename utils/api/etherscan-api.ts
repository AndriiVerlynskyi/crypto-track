import type { dbTransaction } from '../../db/models/Transaction';
import type { BlockApiResponse, Transaction } from '../../typedef';

const ETHER_API_KEY = process.env.ETHER_API_TOKEN;

// axios problem, allows only to import with
const axios = require('axios');

const etherAxiosInstance = axios.create({
  baseURL: 'https://api.etherscan.io/api'
});

export const getLastBlock = async (): Promise<{ data: BlockApiResponse }> => {
  const lastBlockNumber = await etherAxiosInstance.get('', {
    params: {
      module: 'proxy',
      apiKey: ETHER_API_KEY,
      action: 'eth_blockNumber'
    }
  });

  return await etherAxiosInstance.get('', {
    params: {
      module: 'proxy',
      action: 'eth_getBlockByNumber',
      apiKey: ETHER_API_KEY,
      tag: lastBlockNumber.data.result,
      boolean: true
    }
  });
};

export class EtherScan {
  constructor() {
  }
  static transformApiResponseForDb(transactions: Transaction[], timestamp: string) {
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
        (EtherScan.getEthNumber(gasPrice) +
          (maxPriorityFeePerGas ? EtherScan.getEthNumber(maxPriorityFeePerGas) : 0));

      const value = EtherScan.getEthNumber(gweiValue);

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

  static getEthNumber(hexNum: string | number) {
    // Value from api is in gwei, which is 10^-9 * ETH
    return Number(hexNum) * Math.pow(10, -18);
  }
}
