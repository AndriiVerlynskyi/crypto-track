import React from "react";
import { Transaction } from "../../interfaces";

import { getDataFromTimestamp } from "../../services/date";

interface TableProps {
  transactions: Transaction[];
}

export const Table: React.FC<TableProps> = ({ transactions }) => {
  return (
    <table>
      <tbody>
        <tr className="header-row">
          <th>Block number</th>
          <th>Transaction id</th>
          <th>Sender address</th>
          <th>Recipient's address</th>
          <th>Block confirmations</th>
          <th>Date</th>
          <th>Value</th>
          <th>Transaction Fee</th>
        </tr>
        {transactions.map((transaction) => (
          <tr>
            <th>{transaction.blockNumber}</th>
            <th>
              <a href={`https://etherscan.io/tx/${transaction.hash}`}>
                {transaction.hash}
              </a>
            </th>
            <th>{transaction.from}</th>
            <th>{transaction.to}</th>
            <th>{transaction.confirmations}</th>
            <th>{getDataFromTimestamp(transaction.timestamp)}</th>
            <th>{transaction.value}</th>
            <th>{transaction.fee}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
