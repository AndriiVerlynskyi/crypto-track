import { Router } from 'express';

import { etherController } from '../modules/ether-handler/index';

export const appRouter = Router();

appRouter.get('/ether', etherController.getEthTransactions);
