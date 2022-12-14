import { Schema, model } from 'mongoose';

export interface dbTransaction {
  from: string;
  to: string;
  hash: string;
  blockNumber: number;
  fee: number;
  value: number;
  timestamp: number;
  confirmations: number;
}

const transactionSchema = new Schema<dbTransaction>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  hash: { type: String, required: true },
  blockNumber: { type: Number, required: true },
  fee: { type: Number, required: true },
  value: { type: Number, required: true },
  confirmations: { type: Number, required: true },
  timestamp: { type: Number, required: true }
});

export const Transaction = model<dbTransaction>('Transaction', transactionSchema);
