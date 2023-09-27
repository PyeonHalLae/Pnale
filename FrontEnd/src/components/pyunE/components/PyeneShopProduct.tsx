// import React from 'react'
import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import * as pyeneRecoil from "@/recoil/pyeneRecoil";

import PyeneShopProductNineView from "./PyeneShopProductNineView";
import PyeneShopProductFilter from "./PyeneShopProductFilter";
import { useParams } from "react-router-dom";
// import { ProductComp } from "@/model/commonType";

const PyeneShopProductList = () => {
  //recoil 상품 Type 을 위한 값
  const [preProductViewType, setPreProductViewType] = useRecoilState(pyeneRecoil.preProductView);
  const filterCnt = useRecoilValue(pyeneRecoil.FilterCnt);
  const filterInfo = useRecoilValue(pyeneRecoil.FilterInfo);

  //recoil 필터 초기화
  const resetSort = useResetRecoilState(pyeneRecoil.SortFilterDefault);
  const resetEvent = useResetRecoilState(pyeneRecoil.EventFilterDefault);
  const resetMeal = useResetRecoilState(pyeneRecoil.CategoryMealDefault);
  const resetCook = useResetRecoilState(pyeneRecoil.CategoryCookDefault);
  const resetSnack = useResetRecoilState(pyeneRecoil.CategorySnackDefault);
  const resetFood = useResetRecoilState(pyeneRecoil.CategoryFoodDefault);
  const resetDrink = useResetRecoilState(pyeneRecoil.CategoryDrinkDefault);
  const resetLife = useResetRecoilState(pyeneRecoil.CategoryLifeDefault);
  const resetAllEventState = useResetRecoilState(pyeneRecoil.AllEventDefault);
  const resetAllCategoryState = useResetRecoilState(pyeneRecoil.AllCategoryDefault);

  const [productListType, setProductListType] = useState<string>("EVENT");
  const [modalState, setModalState] = useState<boolean>(false);

  const refPyenType = useRef<string>();
  const { pyenType } = useParams();

  //필터 초기화 전용
  useEffect(() => {
    if (preProductViewType.type !== productListType) {
      //필터값 초기화
      setPreProductViewType({ type: productListType });
      ClearFilterHandler();
    }
    if (refPyenType.current !== pyenType) {
      refPyenType.current = pyenType;
      setProductListType("EVENT");
      ClearFilterHandler();
    }
  }, [productListType, pyenType]);

  const ClearFilterHandler = () => {
    resetSort();
    resetEvent();
    resetMeal();
    resetCook();
    resetSnack();
    resetFood();
    resetDrink();
    resetLife();
    resetAllEventState();
    resetAllCategoryState();
  };

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
      {modalState && <PyeneShopProductFilter ModalHandler={ModalHandler} />}
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
          <FilterText>필터 선택 :</FilterText>
          <FilterBtn $filterState={filterCnt > 0 ? true : false} onClick={ModalHandler}>
            <FilterBtnText>필터</FilterBtnText>
            {filterCnt !== 0 && (
              <FilterCntBox>
                <FilterCnt>{filterCnt}</FilterCnt>
              </FilterCntBox>
            )}
            <FilterImg src="/img/icons/filter-icon.png" />
          </FilterBtn>
          <FilterHelpTextBox>
            <FilterHelpText>미리보기는 10개 까지 확인할 수 있습니다.</FilterHelpText>
          </FilterHelpTextBox>
        </FilterBox>
        {filterInfo.category && (
          <>
            <FilterListBox>
              {filterInfo.activeAll.map(
                (value, index) =>
                  index < 10 && (
                    <FilterListBtn key={index}>
                      <FilterListText>{value}</FilterListText>
                    </FilterListBtn>
                  )
              )}
            </FilterListBox>
          </>
        )}
        <PyeneShopProductNineView $productListType={productListType} />
      </ProductListMain>
    </>
  );
};

export default PyeneShopProductList;

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

const FilterBtn = tw.div<{ $filterState: boolean }>`
  relative
  flex
  rounded-2xl
  w-[80px]
  h-[28px]
  text-center
  ${(props) => (props.$filterState ? "bg-common-text-color" : "bg-common-bold-back-color")}
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

const FilterHelpTextBox = tw.div`
  w-[calc(100%-550px)]
  ml-2
  mt-3
  whitespace-nowrap
`;

const FilterHelpText = tw.div`
  scale-[0.9]
  text-[10px]
  text-common-text-gray-color
 
`;

const FilterListBox = tw.div`
w-[calc(100%-10px)]
mt-[1px]
mb-[10px]
mx-auto
whitespace-nowrap
overflow-x-auto
flex
gap-1
h-[23px]
`;

const FilterListBtn = tw.div`
inline-block
rounded-2xl
text-center
justify-center
bg-common-text-color
h-[20px]
my-auto
`;

const FilterListText = tw.div`
text-[13px]
font-normal
text-white
mx-2
py-[1px]
`;
