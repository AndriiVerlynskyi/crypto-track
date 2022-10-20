import { schedule } from 'node-cron';

import { Transaction } from '../db/models/Transaction';
import type { dbTransaction } from '../db/models/Transaction';
import { EtherScanInstance } from './axios/etherscan-api';
import { getEthNumber } from './math';

export const initSheduledFunctions = () => {
  const etherListener = schedule('*/12 * * * * *', async () => {
    try {
      const {
        data: { result }
      } = await EtherScanInstance.getLastBlock();

      const {
        data: {
          result: { transactions, timestamp }
        }
      } = await EtherScanInstance.getBlockByItsNumber(result);

      const transactionsArr: dbTransaction[] = [];

      for (const transaction of transactions) {
        const {
          gas,
          gasPrice,
          maxPriorityFeePerGas,
          from,
          to,
          blockNumber,
          hash,
          value: gweiValue
        } = transaction;
        const fee = getEthNumber(gas) * getEthNumber(gasPrice) + (maxPriorityFeePerGas || 0);
        console.log(fee);
        const value = getEthNumber(gweiValue);

        transactionsArr.push({ from, to, blockNumber, hash, value, fee, timestamp });
      }
      // await Transaction.create(transactionsArr);
    } catch (err) {
      console.log(err);
    }
  });

  etherListener.start();
};
