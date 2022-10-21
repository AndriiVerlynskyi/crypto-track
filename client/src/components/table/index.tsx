import React from "react";
import { Transaction } from "../../interfaces";

import "./styles.scss";
import { Table } from "./table";

interface TableBlockParams {
  transactions: Transaction[];
}

export const TableBlock: React.FC<TableBlockParams> = ({
  transactions
}) => {
  return (
    <div className="table-container-block">
      <Table transactions={transactions} />
    </div>
  );
};
