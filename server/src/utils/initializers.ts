import { type dbTransaction, Transaction } from '../db/models/Transaction';
import { EtherScanInstance } from './api/etherscan-api';

const INITIAL_BLOCKS_AMOUNT = 1000;

export const initialaziFirstBlocks = async () => {
  try {
    const prevTransactions = await Transaction.find();

    if (!prevTransactions) {
      const allTransactionsArr: dbTransaction[] = [];

      for (let i = 0; i < INITIAL_BLOCKS_AMOUNT; i++) {
        const {
          result: { transactions, timestamp }
        } = await EtherScanInstance.getBlockByItsNumber(
          Number((await EtherScanInstance.getLastBlock()).result) - i
        );

        allTransactionsArr.concat(
          EtherScanInstance.transformApiResponseForDb(transactions, timestamp)
        );
      }

      await Transaction.create(allTransactionsArr);
    }
  } catch (err) {
    console.log(err);
  }
};
