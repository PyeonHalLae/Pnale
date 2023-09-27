import tw from "tailwind-styled-components";
import { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { FilterInfo, FilterInfoType } from "@/recoil/pyeneRecoil";

import { ProductComp } from "@/model/commonType";

import PyeneProductCard from "../card/PyeneProductCard";
import { useParams } from "react-router-dom";

/* eslint-disable */
const showPageCnt: number = 5;

const PyeneShopProductNineView = ({ $productViewType }: { $productViewType: string }) => {
  //useSate
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [productList, setProductList] = useState<ProductComp[]>([]);
  //useREf
  const prevProductListType = useRef<string>("EVENT");
  const prevFilterInfo = useRef<FilterInfoType | null>();
  //recoil
  const getFilterInfo = useRecoilValue(FilterInfo);

  const { pyenType } = useParams<string>();

  //페이지 변경 핸들러
  const PageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };
  //처음 화면으로 이동
  const FirstMoveHandler = () => {
    setCurrentPage(1);
  };
  //마지막 페이지로 이동
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

  // 엑시오스 요청
  const AxiosHandler = () => {
    if ($productViewType === "EVENT") {
      console.log(pyenType + " EVENT 정보 요청 ");
      axios.get("/api/conv/event/" + pyenType + "?page=" + currentPage).then((res) => {
        console.log("EVENT 서버 호출 ", currentPage);
        console.log(res);
        const data = res.data.data;
        setTotalPage(data.totalPages);
        setProductList(data.content);
        PageNationSettion();
      });
    } else if ($productViewType === "MONOPOLY") {
      console.log(pyenType + " 독점 정보 요청 ");
      axios.get("/api/conv/pb/" + pyenType + "?page=" + currentPage).then((res) => {
        console.log("독점 서버 호출 ", currentPage);
        const data = res.data.data;
        setTotalPage(data.totalPages);
        setProductList(data.content);
        PageNationSettion();
      });
    }
  };

  //페이지 네이션 세팅(토탈값)
  useEffect(() => {
    if (totalPage !== undefined) {
      PageNationSettion();
    }
  }, [totalPage]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentPage === 0) return;
      if (prevProductListType.current !== $productViewType) {
        prevProductListType.current = await $productViewType;
        await setCurrentPage(0);
        setCurrentPage(1);
      } else {
        if (getFilterInfo !== prevFilterInfo.current) {
          prevFilterInfo.current = getFilterInfo;
          return;
        }
        console.log(getFilterInfo, "필터정보");
        //엑시오스 요청
        AxiosHandler();
      }
    };

    fetchData();
  }, [currentPage, $productViewType]);

  //필터가 변경되었다면 다시 요청
  useEffect(() => {
    if (prevProductListType.current === $productViewType) {
      console.log(getFilterInfo, "수정됬으면 필터정보");
      //엑시오스 요청
      AxiosHandler();
    }
  }, [getFilterInfo, pyenType]);

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-y-3 h-[590px]">
        {productList.map((value, index) => {
          return <PyeneProductCard key={index} $productInfo={value} $listType={"EVENT"} />;
        })}
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

export default PyeneShopProductNineView;

const PaginateBox = tw.div`flex gap-3 justify-center w-[calc(100%-30px)] my-[30px]`;

const FirstMoveBtn = tw.div``;

const ListMoveBtn = tw.div``;

const PageNumberBtn = styled.div<{ $currentPageState: boolean }>`
  background-color: ${(props) => (props.$currentPageState ? "yellow" : "white")};
`;
