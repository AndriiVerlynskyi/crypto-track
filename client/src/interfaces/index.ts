export interface Transaction {
  from: string;
  to: string;
  hash: string;
  blockNumber: string;
  confirmations: number;
  fee: number;
  value: number;
  timestamp: string;
}
