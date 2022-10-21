import { Transaction } from '../db/models/Transaction';
import { transformApiResponseForDb, getLastBlock } from './api/etherscan-api';

const INITIAL_BLOCKS_AMOUNT = 1000;

export const initialaziFirstBlocks = async () => {
  try {
    const prevTransactions = await Transaction.find();

    if (!prevTransactions.length) {

      for (let i = 0; i < INITIAL_BLOCKS_AMOUNT; i++) {
        const { data: { result: { transactions, timestamp } } } = await getLastBlock();

        await Transaction.create(transformApiResponseForDb(transactions, timestamp));

        // In free plan api it's allowded to make 5 requests per second
        await new Promise<void>(resolve => {
          setTimeout(() => resolve(), 500);
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
