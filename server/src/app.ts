import express from 'express';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import { appRouter } from './router';

const app = express();

mongoose.connect(process.env.DATABASE ?? '').then(() => console.log('Connected to the db'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('', appRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API is running on localhost:${PORT}`);
});
