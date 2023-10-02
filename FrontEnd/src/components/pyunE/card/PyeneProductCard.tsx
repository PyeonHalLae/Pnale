// import React from 'react'

// import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

import { ProductComp } from "@/model/commonType";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserInfoExpires, UserNotLogin, ToastBackMessage } from "@/model/toastMessageJHM";
import axios from "axios";

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

const PyeneProductCard = ({
  $productInfo,
  $listType,
}: {
  $productInfo: ProductComp;
  $listType: string;
}) => {
  const [eventInfo, setEventInfo] = useState<pyeneProductEventType>(null);
  const [listType, setListType] = useState<string>();
  const { pyenType } = useParams<string>();
  const [productData, setProductData] = useState<ProductComp>();

  const dumState = false;

  const prodctImgRef = useRef(null);

  useEffect(() => {
    // const eventInfoDefault =  $productInfo.event;
    const pyeneEventInfo: pyeneProductEventType = {
      type: $productInfo.event[pyeneTypeMap[pyenType] + "type"],
      date: $productInfo.event[pyeneTypeMap[pyenType] + "date"],
    };
    setEventInfo(pyeneEventInfo);
    setListType($listType);
    setProductData($productInfo);
  }, [$productInfo]);

  const ImageErrorHandler = () => {
    prodctImgRef.current.src = "/img/sticker/noimage.jpg";
  };

  const ProductLikeHandler = () => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      userLike: {
        ...prevProductData.userLike,
        likeStat: !prevProductData.userLike.likeStat,
      },
    }));
  };

  //좋아요 버튼
  const LikeClickHandler = () => {
    axios
      .get("/api/product/pick/" + $productInfo.product.productId, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          ProductLikeHandler();
          ToastBackMessage(res.data.message);
        }
        //토큰이 만료되었거나 없는경우
        else if (res.data.code == 401) {
          UserInfoExpires();
        }
        //로그인 안되어있는경우
        else if (res.data.code == 403) {
          UserNotLogin();
        } else {
          console.log("그외 서버 오류", res.data);
        }
      });
  };

  return (
    <>
      {productData && (
        <BackSize>
          <ToastContainer position="top-center" />
          <ImageBox>
            <ProductImg
              ref={prodctImgRef}
              src={productData.product.productImg}
              onError={ImageErrorHandler}
            />
            {dumState && <ProductDumImg src="/img/test/image61.png" />}
            {eventInfo && eventInfo.type ? (
              <ProductEventImg src={`/img/sticker/event/sticker-${eventInfo.type}.png`} />
            ) : listType === "BEST" ? (
              <ProductEventImg src="/img/sticker/event/sticker-BEST.png" />
            ) : listType === "NEW" ? (
              <ProductEventImg src="/img/sticker/event/sticker-NEW.png" />
            ) : null}
          </ImageBox>
          <InfoBox>
            <div className="h-6">
              <Category>{productData.product.category}</Category>
              <LikeBtn
                onClick={() => LikeClickHandler()}
                $imgurl={
                  productData.userLike.likeStat
                    ? "/img/btn/like-true.png"
                    : "/img/btn/like-false.png"
                }
              />
            </div>
            <Title>{productData.product.productName}</Title>
            <PriceBox>
              <Price>{productData.product.price}</Price>
              <span>원</span>
            </PriceBox>
          </InfoBox>
        </BackSize>
      )}
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

const LikeBtn = styled.div<{ $imgurl: string }>`
  background-image: url(${(props) => props.$imgurl});
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
