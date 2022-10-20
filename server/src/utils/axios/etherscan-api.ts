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

  async getBlockReq(params: { tag?: string; boolean?: boolean; action: BlockActions }) {
    return await this.etherScanAxiosInstance.get('', {
      params: {
        module: 'proxy',
        apiKey: this.apiKey,
        ...params
      }
    });
  }

  async getLastBlock() {
    return await this.getBlockReq({ action: BlockActions.getLastBlock });
  }

  async getBlockByItsNumber(blockNum: string) {
    return await this.getBlockReq({
      action: BlockActions.getBlockByNumber,
      tag: blockNum,
      boolean: true
    });
  }
}

export const EtherScanInstance = new EtherScan();
