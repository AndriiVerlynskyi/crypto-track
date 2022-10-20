import { schedule } from 'node-cron';

import { Transaction } from '../db/models/Transaction';
import { EtherScanInstance } from './api/etherscan-api';

const updatePreviousTransactionsConfirmation = async () => {
  const allTransactions = await Transaction.find();

  for (const serverTransaction of allTransactions) {
    await Transaction.findByIdAndUpdate(serverTransaction._id, {
      confirmations: serverTransaction.confirmations + 1
    });
  }
};

export const initSheduledFunctions = () => {
  const etherListener = schedule('*/12 * * * * *', async () => {
    try {
      const { result } = await EtherScanInstance.getLastBlock();

      const {
        result: { transactions, timestamp }
      } = await EtherScanInstance.getBlockByItsNumber(result);

      await updatePreviousTransactionsConfirmation();

      const newTransactions = EtherScanInstance.transformApiResponseForDb(transactions, timestamp);

      // await Transaction.create(newTransactions);
    } catch (err) {
      console.log(err);
    }
  });

  etherListener.start();
};
