// import React from 'react'

import { useCallback, useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface ModalHandlerProps {
  ModalHandler: () => void;
}

const PyeneFilter = ({ ModalHandler }: ModalHandlerProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = useCallback(
    (index: number) => {
      if (activeIndex === index) {
        setActiveIndex(null); // 이미 활성화된 항목을 다시 클릭하면 비활성화
      } else {
        setActiveIndex(index); // 그 외의 경우, 해당 항목을 활성화
      }
    },
    [activeIndex]
  );

  return (
    <>
      <BackSide onClick={ModalHandler} />
      <FilterBox>
        <TitleBox>
          <Title>필터 선택</Title>
          <CloseBtn src="/img/btn/close-btn.png" onClick={ModalHandler} />
        </TitleBox>
        <FilterMainBox>
          <SortBox>
            <SortHeader>
              <SortTitle>정렬</SortTitle>
              <SortSide>기본값 : 이름순</SortSide>
            </SortHeader>
            <SortMain>
              <div className={activeIndex === 0 ? "active" : ""} onClick={() => handleItemClick(0)}>
                이름순
              </div>
              <div className={activeIndex === 1 ? "active" : ""} onClick={() => handleItemClick(1)}>
                가장낮은순
              </div>
              <div className={activeIndex === 2 ? "active" : ""} onClick={() => handleItemClick(2)}>
                가장높은순
              </div>
            </SortMain>
          </SortBox>
          <EventBox></EventBox>
          <CategoryBox></CategoryBox>
        </FilterMainBox>
      </FilterBox>
    </>
  );
};

export default PyeneFilter;

const BackSide = tw.div`
  fixed
  top-0
  left-0
  bg-[rgba(51,51,51,0.8)]
  w-full
  h-full
  z-20
`;

const FilterBox = tw.div`
  absolute
  bottom-0
  left-0
  bg-white
  w-full
  h-[80%]
  rounded-[15px_15px_0px_0px]
  z-30
`;

const TitleBox = tw.div`
  h-[52px]
  border-b-2
  border-common-white-divider
  flex
`;

const Title = tw.div`
  text-[22px]
  my-auto
  text-common-text-color
  font-bold
  h-[25px]
  ml-[20px]
`;

const CloseBtn = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  right: 10px;
  top: 8px;
`;

const FilterMainBox = tw.div``;

const SortBox = tw.div`mt-3 ml-[22px]`;

const SortHeader = tw.div` flex text-common-text-color`;

const SortTitle = tw.div`text-[20px] font-bold mr-[6px]`;

const SortSide = tw.div`text-[11px] pt-[10.5px]`;

const SortMain = styled.div`
  width: calc(100% - 44px);
  height: 30px;
  display: flex;
  div {
    font-size: 13px;
    padding: 5px 15px;
    background-color: #aeb0b6;
    margin-right: 10px;
    color: white;
    border-radius: 25px;
    height: 28px;
    display: flex;
    text-align: center;
  }
  div.active {
    background-color: #1e2b4f;
  }
`;

const EventBox = tw.div``;

const CategoryBox = tw.div``;
