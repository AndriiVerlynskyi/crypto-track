import type QueryString from 'qs';
import { Transaction } from '../../db/models/Transaction';
import { createFilter } from '../../utils/filter';

export type EthParams = {
  address?: string;
  perPage?: string;
  transId?: string;
  blockNum?: string;
  pageParam: string;
};

export const getEthTransactions = async (query: EthParams) => {
  const { perPage = 14, pageParam } = query;
  const filter = createFilter(query);
  return await Transaction.find(filter)
    .skip(+perPage * (+pageParam - 1))
    .limit(+perPage);
};
