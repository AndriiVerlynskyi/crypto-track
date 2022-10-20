import React, { useState } from "react";

import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

import { useInfiniteQuery } from "react-query";
import { QueryKeys } from "../../constants/api";

import "./styles.scss";
import { TableBlock } from "../../components/table";
import { Transaction } from "../../interfaces";
import { getTransactions } from "../../services/api";

export const TransactionsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currSearchParam, setCurrSearchParam] = useState("address");

  const [currPage, setCurrPage] = useState(1);

  const { data, fetchNextPage, fetchPreviousPage, hasNextPage, error } =
    useInfiniteQuery<{
      data: Transaction[];
    }>(
      [QueryKeys.TRANSACTIONS, searchValue],
      async ({ pageParam }) => {
        return await getTransactions({
          [currSearchParam]: searchValue ?? undefined,
          pageParam,
        });
      },
      {
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
      }
    );
  return (
    <div className="transactions-container">
      <Header />
      {error ? (
        <p>Error while uploading transactions</p>
      ) : (
        data && (
          <TableBlock
            currSearchParam={currSearchParam}
            setCurrSearchParam={setCurrSearchParam}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            transactions={data}
          />
        )
      )}
      <Footer />
    </div>
  );
};
