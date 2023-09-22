// import React from 'react'
// import tw from "tailwind-styled-components";
import tw from "tailwind-styled-components";
import PyeneProductCard from "../card/PyeneProductCard";
import { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

/* eslint-disable */
const showPageCnt: number = 5;

const PyeneNineItemList = ({ $productListType }: { $productListType: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const prevProductListType = useRef<string>("EVENT");

  const PageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  const FirstMoveHandler = () => {
    setCurrentPage(1);
  };

  const LastMoveHandler = () => {
    setCurrentPage(totalPage);
  };

  //페이지 네이션 현재페이지 위치에따라 변경
  const PageNationSettion = () => {
    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(showPageCnt / 2), totalPage - showPageCnt + 1)
    );
    const endPage = Math.min(totalPage, startPage + showPageCnt - 1);
    const newPageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setPageNumbers(newPageNumbers);
  };

  //페이지 네이션 세팅(토탈값)
  useEffect(() => {
    if (totalPage !== undefined) {
      PageNationSettion();
    }
  }, [totalPage]);

  //서버에서 정보 받아옴
  useEffect(() => {
    const fetchData = async () => {
      if (currentPage === 0) return;
      if (prevProductListType.current !== $productListType) {
        prevProductListType.current = await $productListType;
        await setCurrentPage(0);
        setCurrentPage(1);
      } else {
        if ($productListType === "EVENT") {
          axios.get("/api/product/none").then((res) => {
            console.log("EVENT 서버 호출 ", currentPage);
            const pageAble = res.data.data.pageable;
            setTotalPage(pageAble.pageSize);
            PageNationSettion();
          });
        } else if ($productListType === "MONOPOLY") {
          axios.get("/api/product/none").then((res) => {
            console.log("독점 서버 호출 ", currentPage);
            const pageAble = res.data.data.pageable;
            setTotalPage(pageAble.pageSize);
            PageNationSettion();
          });
        }
      }
    };

    fetchData();
  }, [currentPage, $productListType]);

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
