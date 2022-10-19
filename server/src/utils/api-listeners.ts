import { schedule } from 'node-cron';

export const initSheduledFunctions = () => {
  const etherListener = schedule('*/10 * * * * *', () => {
    console.log('I am called')
  })

  etherListener.start();
}
