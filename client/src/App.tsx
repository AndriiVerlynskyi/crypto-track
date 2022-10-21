import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { TransactionsPage } from "./modules/transactions";

import "./styles.scss";

const queryCLient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <div className="App">
        <TransactionsPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
