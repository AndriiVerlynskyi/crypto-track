import { EthParams } from "../modules/ether-handler/service";
import { FilterQuery } from "mongoose";
import { dbTransaction } from "../db/models/Transaction";

export const createEtherFilter = (query: EthParams) => {
  const { address, transId, blockNum } = query;
  const filter: FilterQuery<dbTransaction> = {};

  if (address) filter.$or = [{ from: address }, { to: address }];
  if (transId) filter.hash = transId;
  if (blockNum) filter.blockNumber = blockNum;
  return filter;
}
