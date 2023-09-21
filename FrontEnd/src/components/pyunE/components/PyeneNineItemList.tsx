// import React from 'react'

// import tw from "tailwind-styled-components";
import tw from "tailwind-styled-components";
import PyeneProductCard from "../card/PyeneProductCard";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const showPageCnt: number = 5;

const PyeneNineItemList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const PageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  const FirstMoveHandler = () => {
    setCurrentPage(1);
  };

  const LastMoveHandler = () => {
    setCurrentPage(totalPage);
  };

  useEffect(() => {
    console.log("나변경됫어", currentPage);
    setTotalPage(10);
    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(showPageCnt / 2), totalPage - showPageCnt + 1)
    );
    const endPage = Math.min(totalPage, startPage + showPageCnt - 1);
    const newPageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setPageNumbers(newPageNumbers);
  }, [currentPage, totalPage]);

  return (
    <>
      <div className="grid grid-cols-3 gap-y-3">
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
      </div>
      <PaginateBox>
        <FirstMoveBtn onClick={FirstMoveHandler}>&lt;&lt;</FirstMoveBtn>
        {pageNumbers.map((page) => (
          <PageNumberBtn
            key={page}
            onClick={() => PageChangeHandler(page)}
            $currentPageState={page === currentPage}
          >
            {page}
          </PageNumberBtn>
        ))}

        <ListMoveBtn onClick={LastMoveHandler}> &gt;&gt;</ListMoveBtn>
      </PaginateBox>
    </>
  );
};

export default PyeneNineItemList;

const PaginateBox = tw.div`flex gap-3 justify-center w-[calc(100%-30px)] my-[30px]`;

const FirstMoveBtn = tw.div``;

const ListMoveBtn = tw.div``;

const PageNumberBtn = styled.div<{ $currentPageState: boolean }>`
  background-color: ${(props) => (props.$currentPageState ? "yellow" : "white")};
`;
