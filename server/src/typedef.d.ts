export type Transaction = {
  from: string;
  to: string;
  hash: string;
  blockNumber: string;
  gas: string;
  gasPrice: string;
  maxPriorityFeePerGas: string;
  value: string;
};

export type BlockApiResponse = {
  jsonrpc: string;
  id: number;
  result: {
    baseFeePerGas: string;
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: Transaction[];
  };
  transactionsRoot: string;
};
