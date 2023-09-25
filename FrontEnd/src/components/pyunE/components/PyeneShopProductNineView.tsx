import tw from "tailwind-styled-components";
import { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { FilterInfo, FilterInfoType } from "@/recoil/pyeneRecoil";

import PyeneProductCard from "../card/PyeneProductCard";

// interface ProductType {
//   productInfo: {
//     productId: number;
//     productName: string;
//     productImg: string;
//     productDesc: null | string;
//     price: number;
//     category: string;
//     pb: null;
//     recommand: null;
//     hit: number | null;
//   };
//   userLikeProd: {
//     pickProdId: null;
//     likeStat: boolean;
//     received: boolean;
//   };
//   evnetInfo: {
//     cutype: string | null;
//     cudate: string | null;
//     gstype: string | null;
//     gsdate: string | null;
//     seventype: string | null;
//     sevendate: string | null;
//     emarttype: string | null;
//     emartdate: string | null;
//   };
// }

/* eslint-disable */
const showPageCnt: number = 5;

const PyeneShopProductNineView = ({ $productListType }: { $productListType: string }) => {
  //useSate
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  //useREf
  const prevProductListType = useRef<string>("EVENT");
  const prevFilterInfo = useRef<FilterInfoType | null>();
  //recoil
  const getFilterInfo = useRecoilValue(FilterInfo);

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
      if (prevProductListType.current !== $productListType) {
        prevProductListType.current = await $productListType;
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
  }, [currentPage, $productListType]);

  //필터가 변경되었다면 다시 요청
  useEffect(() => {
    if (prevProductListType.current === $productListType) {
      console.log(getFilterInfo, "수정됬으면 필터정보");
      //엑시오스 요청
      AxiosHandler();
    }
  }, [getFilterInfo]);

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

export default PyeneShopProductNineView;

const PaginateBox = tw.div`flex gap-3 justify-center w-[calc(100%-30px)] my-[30px]`;

const FirstMoveBtn = tw.div``;

const ListMoveBtn = tw.div``;

const PageNumberBtn = styled.div<{ $currentPageState: boolean }>`
  background-color: ${(props) => (props.$currentPageState ? "yellow" : "white")};
`;
