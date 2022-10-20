import React from "react";

import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

import "./styles.scss";
import { TableBlock } from "../../components/table";

export const TransactionsPage: React.FC = () => {
  return (
    <div className="transactions-container">
      <Header />
      <TableBlock />
      <Footer />
    </div>
  );
};
