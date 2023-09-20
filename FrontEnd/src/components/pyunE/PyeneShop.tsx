// import React from 'react'
import Header from "@components/common/Header";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

import PyeneThereItemList from "./components/PyeneThereItemList";
import PyeneProductList from "./components/PyeneProductList";

// interface productInfoType {}

const colorMap = {
  CU: "#652F8D",
  GS: "#006FBA",
  EMART: "#636569",
  SEVEN: "#F18713",
};

const PyeneShop = () => {
  const { pyenType } = useParams<string>();
  // const [bestList, setBestList] = useState<productInfoType>([]);
  // const [newList, setNewList] = useState<productInfoType[]>([]);
  // const [productList, setProductList] = useState<productInfoType[]>([]);
  const [pyeneText, setPyeneText] = useState<string>();

  useEffect(() => {
    setPyeneText(colorMap[pyenType]);
    console.log(pyenType);
  }, [pyenType]);

  return (
    <>
      <Header />
      <PyeneHeader></PyeneHeader>
      <PyeneBestBox>
        <AddBtn $pyeneColor={pyeneText}>더보기</AddBtn>
        <SideTitle $pyeneColor={pyeneText}>
          <img src={`/img/icons/${pyenType}-icon.png`} />
          <div>베스트</div>
          <p>상품</p>
        </SideTitle>
        <PyeneThereItemList />
      </PyeneBestBox>
      <PyeneNewBox>
        <AddBtn $pyeneColor={pyeneText}>더보기</AddBtn>
        <SideTitle $pyeneColor={pyeneText}>
          <img src={`/img/icons/${pyenType}-icon.png`} />
          <div>NEW</div>
          <p>상품</p>
        </SideTitle>
        <PyeneThereItemList />
      </PyeneNewBox>
      <PyeneProductBox>
        <SideTitle $pyeneColor={pyeneText}>
          <img src={`/img/icons/${pyenType}-icon.png`} />
          <div>상품</div>
        </SideTitle>
        <PyeneProductList />
      </PyeneProductBox>
      <PyeneDirectBox>
        <DirectText $pyeneColor={pyeneText}>
          <span>편의점</span>바로가기
        </DirectText>
      </PyeneDirectBox>
    </>
  );
};

export default PyeneShop;

const PyeneHeader = tw.div`
  bg-white
  w-full
  h-44
`;

const PyeneBestBox = tw.div`
  flex;
  bg-white
  w-full
  h-[270px]
  border
`;

const PyeneNewBox = tw.div`
  w-full
  h-[270px]
  mt-[6px]
  bg-[#FB9B7730]
  `;

const PyeneProductBox = tw.div`
  bg-white
  w-full
  h-[720px]
  mt-[6px]
`;

const PyeneDirectBox = tw.div`
bg-white
  w-full
  h-[190px]
  mt-[6px]
`;

const SideTitle = styled.div<{ $pyeneColor: string }>`
  display: flex;
  font-size: 20px;
  padding: 14px 0px 0px 9px;
  img {
    height: 30px;
    border-top: 3px solid ${(props) => props.$pyeneColor};
    padding-top: 5px;
  }
  div {
    font-weight: bold;
    color: ${(props) => props.$pyeneColor};
    border-top: 3px solid ${(props) => props.$pyeneColor};
    padding-top: 3px;
    margin-right: 5px;
  }
  p {
    color: #1e2b4f;
    padding-top: 6px;
  }
`;

const AddBtn = styled.div<{ $pyeneColor: string }>`
  color: ${(props) => props.$pyeneColor};
  font-size: 14px;
  font-weight: bold;
  float: right;
  margin-top: 35px;
  margin-right: 15px;
`;

const DirectText = styled.div<{ $pyeneColor: string }>`
  padding: 10px 0px 0px 10px;
  font-size: 24px;
  color: #1e2b4f;
  span {
    color: ${(props) => props.$pyeneColor};
  }
`;
