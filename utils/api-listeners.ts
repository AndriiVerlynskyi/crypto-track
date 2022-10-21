import { schedule } from 'node-cron';

import { Transaction } from '../db/models/Transaction';
import { EtherScan, getLastBlock } from './api/etherscan-api';

const updatePreviousTransactionsConfirmation = async () => {
  const allTransactions = await Transaction.find();

  for (const serverTransaction of allTransactions) {
    await Transaction.findByIdAndUpdate(serverTransaction._id, {
      confirmations: serverTransaction.confirmations + 1
    });
  }
};

export const initSheduledFunctions = () => {
  // every 12 seconds
  const etherListener = schedule('*/12 * * * * *', async () => {
    try {
      const { data: { result: { transactions, timestamp } } } = await getLastBlock();

      await updatePreviousTransactionsConfirmation();

      await Transaction.create(EtherScan.transformApiResponseForDb(transactions, timestamp));
    } catch (err) {
      console.log(err);
    }
  });

  etherListener.start();
};
