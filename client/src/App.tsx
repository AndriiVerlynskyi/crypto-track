import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { TransactionsPage } from "./modules/transactions";

const queryCLient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <TransactionsPage />
    </QueryClientProvider>
  );
}

export default App;
