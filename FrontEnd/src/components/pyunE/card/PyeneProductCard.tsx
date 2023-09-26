// import React from 'react'

// import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

import { Main, MainProduct } from "@/model/commonType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface pyeneProductEventType {
  type: string;
  date: string;
}

const pyeneTypeMap = {
  CU: "cu",
  GS: "gs",
  SEVEN: "seven",
  EMART: "emart",
};

const PyeneProductCard = ({ $productInfo }: { $productInfo: Main }) => {
  const [eventInfo, setEventInfo] = useState<pyeneProductEventType>();
  const { pyeneType } = useParams();
  const dumState = false;

  useEffect(() => {
    // const eventInfoDefault =  $productInfo.event;
    const pyeneEventInfo: pyeneProductEventType = {
      type: $productInfo.event[pyeneTypeMap[pyeneType] + "type"],
      date: $productInfo.event[pyeneTypeMap[pyeneType] + "date"],
    };
    setEventInfo(pyeneEventInfo);
  }, []);

  return (
    <>
      <BackSize>
        <ImageBox>
          <ProductImg src={$productInfo.product.productImg} />
          {dumState && <ProductDumImg src="/img/test/image61.png" />}
          {eventInfo ? (
            <ProductEventImg src="/img/icons/best-product-icon.png" />
          ) : (
            <ProductEventImg src="/img/icons/best-product-icon.png" />
          )}
        </ImageBox>
        <InfoBox>
          <div className="h-6">
            <Category>{$productInfo.product.category}</Category>
            <LikeBtn />
          </div>
          <Title>{$productInfo.product.productName}</Title>
          <PriceBox>
            <Price>{$productInfo.product.price}</Price>
            <span>원</span>
          </PriceBox>
        </InfoBox>
      </BackSize>
    </>
  );
};

export default PyeneProductCard;

const BackSize = tw.div`
  w-[95%]
  h-[187px]
  bg-common-back-color
  mx-auto
  mt-[1px]
  shadow-[0px_0px_3px_rgba(0,0,0,0.2)]
`;

const ImageBox = tw.div`
  w-full
  h-[110px]
  bg-white
  flex
  relative
  `;

const ProductImg = tw.img`
  w-[90px]
  h-[95px]
  mx-auto
  my-auto
`;

const ProductEventImg = tw.img`
  w-[25px]
  h-[25px]
  absolute
  z-10
  top-1
  right-1
  drop-shadow-[0px_0px_2px_rgba(0,0,0,0.3)]
`;

const InfoBox = tw.div`
  w-full
`;

const Category = styled.span`
  display: inline-block;
  margin: 4px 0px 4px 5px;
  min-width: 30px;
  max-width: calc(100% - 35px);
  overflow: hidden;
  word-break: break-all;
  height: 16px;
  text-align: center;
  border: 1px solid #1e2b4f;
  border-radius: 0.1875rem;
  color: #1e2b4f;
  padding: 1px 6px;
  font-size: 10px;
`;

const LikeBtn = styled.div`
  background-image: url("/img/btn/like-false.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 15px 15px;
  width: 20px;
  height: 20px;
  float: right;
  margin: 2px 4px 2px 0px;
`;

const Title = styled.div`
  margin: 0px auto;
  font-size: 10px;
  font-weight: normal;
  width: calc(100% - 10px);
  color: #1e2b4f;
  height: 27px;
  word-wrap: break-word;
  overflow: hidden; //숨기는거고
  display: -webkit-box; // webkit-box다
  -webkit-line-clamp: 2; //둘줄까지만보여라
  -webkit-box-orient: vertical; //... 해주는거 - tw 할경우 "line-clamp-2" 로 4줄생략가능
`;

const PriceBox = tw.div`
  mx-[auto]
  mt-[2px]
  w-[calc(100%-10px)]
  text-[10px]
  text-common-text-color
  
`;

const Price = tw.div`
  text-[14px]
  text-common-text-color
  font-bold
  inline-block
  mr-[2px]
`;

const ProductDumImg = styled.img`
  position: absolute;
  border: 2px dashed #5fc6ff;
  width: 45px;
  height: 50px;
  bottom: 3px;
  right: 3px;
`;
