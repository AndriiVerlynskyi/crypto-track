import { schedule } from 'node-cron';

import { Transaction } from '../db/models/Transaction';
import { transformApiResponseForDb, getLastBlock } from './api/etherscan-api';

export const initSheduledFunctions = () => {
  // every 12 seconds
  const etherListener = schedule('*/12 * * * * *', async () => {
    try {
      const {
        data: {
          result: { transactions, timestamp }
        }
      } = await getLastBlock();

      await Transaction.create(transformApiResponseForDb(transactions, +timestamp));

      await Transaction.updateMany({}, { $inc: { confirmations: 1 } });
    } catch (err) {
      console.log('Loop func err', err);
    }
  });

  etherListener.start();
};
