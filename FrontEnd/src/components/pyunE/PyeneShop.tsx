// import React from 'react'
import Header from "@components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import PyeneShopThreeView from "./components/PyeneShopThereView";
import PyeneShopProduct from "./components/PyeneShopProduct";
import PyeneShopDirectList from "./components/PyeneShopDirectList";
import PyeneShopBanner from "./components/PyeneShopBanner";

import { ProductComp } from "@/model/commonType";

interface bannerType {
  bannerId: number;
  bannerName: string;
  corpType: null | string;
  endDate: string;
  fullImg: string;
  startDate: string;
  thumbnailImg: string;
}

const colorMap = {
  CU: "#652F8D",
  GS: "#006FBA",
  EMART: "#636569",
  SEVEN: "#F18713",
};

const PyeneShop = () => {
  const { pyenType } = useParams<string>();
  const [pyeneText, setPyeneText] = useState<string>();
  const pyeneHeader = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [bestList, setBestList] = useState<ProductComp[]>([]);
  const [newList, setNewList] = useState<ProductComp[]>([]);
  // const [productList, setProductList] = useState<ProductComp[]>([]);
  const [bannerList, setBannerList] = useState<bannerType[]>([]);

  const scrollToHeader = () => {
    if (pyeneHeader.current) {
      pyeneHeader.current.scrollIntoView();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/conv/" + pyenType).then((res) => {
        const response = res.data;
        if (response.code === 200) {
          const data = response.data;
          console.log(data);
          setBannerList(data.banners);
          setBestList(data.bestProduct.content);
          setNewList(data.newProduct.content);
          // setProductList(data.eventProduct.content);
          // console.log(productList, "최상단");
        }
      });
    };

    setPyeneText(colorMap[pyenType]);
    fetchData();
  }, [pyenType]);

  return (
    <>
      <PyeneHeader ref={pyeneHeader}>
        <Header />
        <PyeneShopBanner $bannerList={bannerList} />
      </PyeneHeader>
      <PyeneBestBox>
        <AddBtn
          $pyeneColor={pyeneText}
          onClick={() => {
            navigate("more", { state: "BEST" });
          }}
        >
          더보기
        </AddBtn>
        <SideTitle $pyeneColor={pyeneText}>
          <img src={`/img/icons/${pyenType}-icon.png`} />
          <div>베스트</div>
          <p>상품</p>
        </SideTitle>
        <PyeneShopThreeView $productList={bestList} $listViewType={"BEST"} />
      </PyeneBestBox>
      <PyeneNewBox>
        <AddBtn
          $pyeneColor={pyeneText}
          onClick={() => {
            navigate("more", { state: "NEW" });
          }}
        >
          더보기
        </AddBtn>
        <SideTitle $pyeneColor={pyeneText}>
          <img src={`/img/icons/${pyenType}-icon.png`} />
          <div>NEW</div>
          <p>상품</p>
        </SideTitle>
        <PyeneShopThreeView $productList={newList} $listViewType={"NEW"} />
      </PyeneNewBox>
      <PyeneProductBox>
        <SideTitle $pyeneColor={pyeneText}>
          <img src={`/img/icons/${pyenType}-icon.png`} />
          <div>상품</div>
        </SideTitle>
        <PyeneShopProduct />
      </PyeneProductBox>
      <PyeneDirectBox>
        <DirectText $pyeneColor={pyeneText}>
          <span>편의점</span>바로가기
        </DirectText>
        <PyeneShopDirectList scrollHeader={scrollToHeader()} />
      </PyeneDirectBox>
    </>
  );
};

export default PyeneShop;

const PyeneHeader = tw.div`
  bg-white
  w-full
  h-[230px]
`;

const PyeneBestBox = tw.div`
  flex;
  bg-white
  w-full
  h-[310px]
  border
`;

const PyeneNewBox = tw.div`
  w-full
  h-[310px]
  mt-[6px]
  bg-[#FB9B7730]
  `;

const PyeneProductBox = tw.div`
  bg-white
  w-full
  h-[850px]
  mt-[6px]
`;

const PyeneDirectBox = tw.div`
bg-white
  w-full
  h-[210px]
  mt-[6px]
`;

const SideTitle = styled.div<{ $pyeneColor: string }>`
  display: flex;
  font-size: 27px;
  padding: 17px 0px 0px 9px;
  img {
    height: 37px;
    border-top: 3px solid ${(props) => props.$pyeneColor};
    padding-top: 5px;
    max-width: 150px;
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
