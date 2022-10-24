import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import 'dotenv/config';

import mongoose from 'mongoose';

import { appRouter } from './router';
import { initSheduledFunctions } from './utils/api-listeners';
import { initialaziFirstBlocks } from './utils/initializers';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialaziFirstBlocks()
//   .then(() => initSheduledFunctions())
//   .catch(err => console.log('Smth went wrong while initializing first block', err));

app.use('', appRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '.client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE ?? '').then(() =>
  app.listen(PORT, () => {
    console.log(`API is running on localhost:${PORT}`);
  })
);
