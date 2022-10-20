import { Schema, model } from 'mongoose';

export interface dbTransaction {
  from: string;
  to: string;
  hash: string;
  blockNumber: string;
  fee: number;
  value: number;
  timestamp: string;
}

const transactionSchema = new Schema<dbTransaction>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  hash: { type: String, required: true },
  blockNumber: { type: String, required: true },
  fee: { type: Number, required: true },
  value: { type: Number, required: true },
  timestamp: { type: String, required: true }
});

export const Transaction = model<dbTransaction>('Transaction', transactionSchema);
