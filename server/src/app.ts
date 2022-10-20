import express from 'express';
import bodyParser from 'body-parser';

import 'dotenv/config';

import mongoose from 'mongoose';

import { appRouter } from './router';
import { initSheduledFunctions } from './utils/api-listeners';
import { initialaziFirstBlocks } from './utils/initializers';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initialaziFirstBlocks();
initSheduledFunctions();

app.use('', appRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE ?? '').then(() =>
  app.listen(PORT, () => {
    console.log(`API is running on localhost:${PORT}`);
  })
);
