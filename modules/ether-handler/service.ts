import type { FilterQuery } from 'mongoose';
import { type dbTransaction, Transaction } from '../../db/models/Transaction';
import { createEtherFilter } from '../../utils/filter';

export type EthParams = {
  address?: string;
  perPage?: string;
  transId?: string;
  blockNum?: string;
  pageParam: string;
};

export const getEthTransactions = async (query: EthParams) => {
  const { perPage = 14, pageParam } = query;
  const filter: FilterQuery<dbTransaction> = createEtherFilter(query);

  const transactions = await Transaction.find(filter)
    .sort({ timestamp: -1 })
    .skip(+perPage * (+pageParam - 1))
    .limit(+perPage);
  const transactionsCount = await Transaction.count(filter);

  return {
    transactions,
    totalPages: Math.ceil(transactionsCount / +perPage)
  };
};
