import { type dbTransaction, Transaction } from '../db/models/Transaction';
import { EtherScanInstance } from './api/etherscan-api';

const INITIAL_BLOCKS_AMOUNT = 1000;

export const initialaziFirstBlocks = async () => {
  try {
    const prevTransactions = await Transaction.find();

    if (!prevTransactions.length) {
      const allTransactionsArr: dbTransaction[] = [];

      for (let i = 0; i < INITIAL_BLOCKS_AMOUNT; i++) {
        const { result: lastBlockNumber } = await EtherScanInstance.getLastBlock();

        const {
          result: { transactions, timestamp }
        } = await EtherScanInstance.getBlockByItsNumber((Number(lastBlockNumber) - i).toString(16));

        allTransactionsArr.concat(
          EtherScanInstance.transformApiResponseForDb(transactions, timestamp)
        );

        // In free plan api it's allowded to make 5 requests per second
        await new Promise<void>(resolve => {
          setTimeout(() => resolve(), 500);
        });
      }

      await Transaction.create(allTransactionsArr);
    }
  } catch (err) {
    console.log(err);
  }
};
