import { asyncWrapper } from '../../helpers/async-wrapper';
import { etherService } from '.';
import type { EthParams } from './service';

export const getEthTransactions = asyncWrapper(async ({ query }, res) => {
  const result = await etherService.getEthTransactions(query as EthParams);

  res.status(200).send(result);
});
