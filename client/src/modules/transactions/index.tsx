import React, { useState } from "react";

import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

import { useQuery } from "react-query";
import { QueryKeys } from "../../constants/api";

import "./styles.scss";
import { TableBlock } from "../../components/table";
import { Transaction } from "../../interfaces";
import { getTransactions } from "../../services/api";
import { Paginator } from "../../components/paginator";
import { AxiosResponse } from "axios";

export const TransactionsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currSearchParam, setCurrSearchParam] = useState("address");

  const [currPage, setCurrPage] = useState(1);

  const {
    data: queryData,
    error,
    refetch,
    isLoading,
  } = useQuery<
    AxiosResponse<{
      transactions: Transaction[];
      totalPages: number;
    }>
  >([QueryKeys.TRANSACTIONS, currPage], async () => {
    return await getTransactions({
      [currSearchParam]: searchValue ?? undefined,
      pageParam: currPage,
    });
  });
  return (
    <div className="transactions-container">
      <Header />
      {error ? (
        <p>Error while uploading transactions</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        queryData && (
          <>
            <TableBlock
              onSearchClick={() =>
                refetch({
                  [currSearchParam]: searchValue ?? undefined,
                })
              }
              currSearchParam={currSearchParam}
              setCurrSearchParam={setCurrSearchParam}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              transactions={queryData.data.transactions}
            />
            <Paginator
              className="centered"
              onClick={(pageNum) => setCurrPage(pageNum)}
              currentPage={currPage}
              totalPages={queryData.data.totalPages}
            />
          </>
        )
      )}
      <Footer />
    </div>
  );
};
