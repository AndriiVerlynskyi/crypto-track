import React, { useMemo } from "react";
import "./styles.scss";

interface PaginatorProps {
  totalPages: number;
  currentPage: number;
  onClick: (pageNum: number) => void;
  className?: string;
}

export const Paginator: React.FC<PaginatorProps> = ({
  totalPages,
  currentPage,
  onClick,
  className,
}) => {
  const initialPage =
    currentPage - 2 > 0
      ? currentPage - 2
      : currentPage - 1 > 0
      ? currentPage - 1
      : currentPage;
  const values = useMemo(() => {
    const valuesArr: number[] = [];
    for (
      let i = initialPage;
      i <= totalPages && i <= currentPage + 4 - currentPage + initialPage;
      i++
    ) {
      valuesArr.push(i);
    }

    return valuesArr;
  }, [totalPages, currentPage, initialPage]);
  return (
    <div className={`paginator-container ${className}`}>
      {values.map((value) => (
        <div
          onClick={() => onClick(value)}
          key={value}
          className={`paginator-option ${
            currentPage === value ? "active" : ""
          }`}
        >
          {value}
        </div>
      ))}
    </div>
  );
};
