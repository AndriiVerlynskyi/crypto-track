import axios from "axios";
import { Transaction } from "../interfaces";

export const axiosInstance = axios.create({ baseURL: process.env.BASE_URL });

export type TransactionParams =
  | {
      address?: string;
      transId?: string;
      blockNum?: string;
      pageParam: number;
      perPage?: number;
    }
  | undefined;

type GetTransactionsType = {
  totalPages: number;
  transactions: Transaction[];
};

export const getTransactions = (params: TransactionParams) =>
  axiosInstance.get<GetTransactionsType>("ether", { params });
