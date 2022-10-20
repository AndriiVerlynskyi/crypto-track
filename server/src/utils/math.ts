export const getEthNumber = (hexNum: string | number) => {
  // Value from api is in gwei, which is 10^-9 * ETH
  return Number(hexNum) * Math.pow(10, -9);
};
