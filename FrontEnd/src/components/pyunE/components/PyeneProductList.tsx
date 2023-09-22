// import React from 'react'
import { useState } from "react";
import tw from "tailwind-styled-components";

import PyeneNineItemList from "./PyeneNineItemList";
import styled from "styled-components";
// import { useEffect } from "react";
import PyeneFilter from "./PyeneFilter";

const PyeneProductList = () => {
  const [productListType, setProductListType] = useState<string>("EVENT");
  const [modalState, setModalState] = useState<boolean>(false);
  // const [recipeList, setRecipeList] = useState<recipeInfoType[]>([]);

  const ModalHandler = () => {
    setModalState(!modalState);
  };

  const OnEventHandler = () => {
    if (productListType !== "EVENT") {
      setProductListType("EVENT");
    }
  };

  const OnMonopolyHandler = () => {
    if (productListType !== "MONOPOLY") {
      setProductListType("MONOPOLY");
    }
  };

  return (
    <>
      {modalState && <PyeneFilter ModalHandler={ModalHandler} $productListType={productListType} />}
      <ProductListHeader>
        <SideBtn>
          <EventProductBtn
            className={`${productListType === "EVENT" ? "border-b-[3px]" : "border-b-0"}`}
            onClick={OnEventHandler}
          >
            행사 상품
          </EventProductBtn>
          <MonopolyBtn
            className={`${productListType === "MONOPOLY" ? "border-b-[3px]" : "border-b-0"}`}
            onClick={OnMonopolyHandler}
          >
            독점상품
          </MonopolyBtn>
        </SideBtn>
      </ProductListHeader>
      <ProductListMain>
        <FilterBox>
          <FilterText>필터 선택:</FilterText>
          <FilterBtn onClick={ModalHandler}>
            <FilterBtnText>필터</FilterBtnText>
            <FilterCntBox>
              <FilterCnt>5</FilterCnt>
            </FilterCntBox>
            <FilterImg src="/img/icons/filter-icon.png" />
          </FilterBtn>
        </FilterBox>
        <PyeneNineItemList $productListType={productListType} />
      </ProductListMain>
    </>
  );
};

export default PyeneProductList;

const ProductListHeader = tw.div`
  mt-[10px] border-b-[1px] border-common-text-gray-color h-[28px]
`;

const SideBtn = tw.div`
  flex
  text-[1rem]
  text-common-text-color
  ml-[0.3125rem]
`;

const EventProductBtn = tw.div`
  ml-[0.625rem]
  w-[90px]
  h-[29px]  
  text-[20px]
  text-center
  border-common-text-color
  `;

const MonopolyBtn = tw.div`
  ml-[0.9375rem]
  w-[90px]
  h-[29px]  
  text-[20px]
  text-center
  border-common-text-color
`;

const ProductListMain = tw.div`
  w-[calc(100%-20px)]
  h-[690px]
  mt-[10px]
  mx-auto
`;

const FilterBox = tw.div`
 flex
 my-[10px]
`;

const FilterText = tw.div`
  text-[13px]
  text-common-text-gray-color
  my-auto
  mr-[10px]
  ml-[5px]
  pt-1
`;

const FilterBtn = tw.div`
  relative
  flex
  rounded-2xl
  w-[80px]
  h-[28px]
  text-center
  bg-common-text-color
  justify-center
`;

const FilterBtnText = tw.div`
  text-[15px]
  text-white
  font-bold
  my-auto

`;

const FilterImg = tw.img`
  w-[15px]
  h-[15px]
  my-auto
  ml-[2px]
`;

const FilterCntBox = tw.div`
  w-[15px]
  h-[15px]
  bg-common-orange
  rounded-lg
  absolute
  z-10
  top-[1px]
  right-[10px]
  
`;

const FilterCnt = styled.div`
  font-size: 11px;
  font-weight: bold;
  color: white;
`;
