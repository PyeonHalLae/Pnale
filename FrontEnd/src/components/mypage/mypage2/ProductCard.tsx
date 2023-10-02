// import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { ProductComp } from "@/model/commonType";
import axios from "axios";

interface EventType {
  pyeneType: string; //편의저명
  eventType: string; //행사중일때 해당하는 행사 ( 1+1 2+1)
}

interface EventImg {
  imgurl: string;
}

const pyeneList = ["cu", "seven", "gs", "emart"];

const ProductCard = ({ $productInfo }: { $productInfo: ProductComp }) => {
  const [eventUrl, setEventUrl] = useState<EventImg[]>([]);
  const [productData, setProductData] = useState<ProductComp>();

  useEffect(() => {
    setProductData($productInfo);
  }, [$productInfo]);

  //이벤트 이미지 세팅
  const eventImgCheck = async () => {
    const eventList = pyeneList.map((value) => ({
      pyeneType: value.toUpperCase(),
      eventType:
        $productInfo.event[value + "type"] === null ? "NONE" : $productInfo.event[value + "type"],
    }));

    const eventImgInfo: EventImg[] = [];
    await eventList.map((eventInfo: EventType) => {
      const { pyeneType, eventType } = eventInfo;
      const eventImgUrl = `/img/sticker/event/${pyeneType}-${eventType}.png`;

      eventImgInfo.push({ imgurl: eventImgUrl });
    });

    await setEventUrl([...eventImgInfo]);
  };

  const ProductReceiveHandler = () => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      userLike: {
        ...prevProductData.userLike,
        received: !prevProductData.userLike.received,
      },
    }));
  };

  const ProductLikeHandler = () => {
    setProductData(null);
  };

  //메일 체크
  const MailClickHandler = () => {
    axios
      .get("/api/product/receive/" + $productInfo.product.productId, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          ProductReceiveHandler();
        }
      })
      .catch((err) => {
        const code = err.response.status;
        if (code == 401) {
          axios
            .get("/api/auth/product/receive/" + $productInfo.product.productId, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.code == 200) {
                ProductReceiveHandler();
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                console.log("재로그인 해주세요");
              }
            });
        } else if (code == 403) {
          console.log("애초에 로그인 안되어있던 사람");
        } else {
          console.log("그외 서버 오류");
        }
      });
  };

  //좋아요 해제
  const LikeClickHandler = () => {
    axios
      .get("/api/product/pick/" + $productInfo.product.productId, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          ProductLikeHandler();
        }
      })
      .catch((err) => {
        const code = err.response.status;
        if (code == 401) {
          axios
            .get("/api/auth/product/pick/" + $productInfo.product.productId, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                ProductLikeHandler();
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                console.log("재로그인 해주세요");
              }
            });
        } else if (code == 403) {
          console.log("애초에 로그인 안되어있던 사람");
        } else {
          console.log("그외 서버 오류");
        }
      });
  };

  useEffect(() => {
    eventImgCheck();
  }, [$productInfo]);

  return (
    <>
      {productData && (
        <BackSize>
          <Card>
            <ImageBox $imgurl={productData.product.productImg} />
            <InfoBox>
              <ProductInfo>
                <ProductTitle>{productData.product.productName}</ProductTitle>
                <div className="flex mt-1">
                  <Price>
                    {" "}
                    {productData.product.price}
                    <PriceText>원</PriceText>
                  </Price>
                  <Like
                    onClick={() => {
                      LikeClickHandler();
                    }}
                  />
                </div>
                <Category>{productData.product.category}</Category>
                <MailBox>
                  메일 알림 받기
                  <MailBtn
                    onClick={() => {
                      MailClickHandler();
                    }}
                    $mailState={
                      productData.userLike.received
                        ? "/img/btn/checkbox-true.png"
                        : "/img/btn/checkbox-false.png"
                    }
                  />
                </MailBox>
              </ProductInfo>
              <EventInfo>
                {eventUrl.map((value, index) => (
                  <EventImg key={index} $imgurl={value.imgurl} />
                ))}
              </EventInfo>
            </InfoBox>
          </Card>
        </BackSize>
      )}
    </>
  );
};

export default ProductCard;

const BackSize = tw.div` 
    w-full h-[7.5rem]
    bg-white
    my-[0.625rem]
    mx-auto
`;

const Card = tw.div`
  flex
  h-full
  w-[21.875rem]
  mx-auto
`;

const ImageBox = styled.div<{ $imgurl: string }>`
  width: 6.875rem;
  height: 7.1875rem;
  margin: auto 0.3125rem;
  background-image: url(${(props) => props.$imgurl});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const InfoBox = tw.div`
  flex
  ml-[0.625rem]
  w-[calc(100%-7.5rem)]
  h-full
`;

const ProductInfo = tw.div`
  w-[75%]
  h-[85%]
  my-auto
`;

const ProductTitle = styled.div`
  font-size: 13px;
  width: 8.5rem;
  height: 2.125rem;
  font-weight: bold;
  color: #1e2b4f;
  word-wrap: break-word;
  overflow: hidden; //숨기는거고
  display: -webkit-box; // webkit-box다
  -webkit-line-clamp: 2; //둘줄까지만보여라
  -webkit-box-orient: vertical; //... 해주는거 - tw 할경우 "line-clamp-2" 로 4줄생략가능
`;

const Price = tw.div`
  text-[1rem] mx-[0.125rem]
  w-[5.625rem]
`;

const PriceText = tw.span`
  ml-[2px]  
  text-[11px]
  text-common-text-color
`;

const Like = styled.div`
  width: 0.9375rem;
  height: 1.25rem;
  background-image: url("/img/btn/like-true.png");
  background-position: center;
  background-size: 0.9375rem 0.9375rem;
  background-repeat: no-repeat;
`;

const Category = styled.span`
  display: inline-block;
  margin: 0.0625rem 0rem 0px 0px;
  min-width: 2.5625rem;
  max-width: 8.125rem;
  overflow: hidden;
  word-break: break-all;
  padding: 0.0625rem 0.3125rem;
  height: 1.125rem;
  line-height: 1.125rem;
  font-size: 0.625rem;
  text-align: center;
  border: 0.0625rem solid #1e2b4f;
  border-radius: 0.1875rem;
  color: #1e2b4f;
`;

const MailBox = tw.div`
  flex
  text-[0.625rem]
  leading-[1rem]
  h-[0.9375rem]
  text-[#aeb0b6]
`;

const MailBtn = styled.div<{ $mailState: string }>`
  width: 0.875rem;
  height: 0.875rem;
  margin-left: 0.25rem;
  background-image: url(${(props) => props.$mailState});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const EventInfo = tw.div`
  w-[35%]
  my-auto
`;

const EventImg = styled.div<{ $imgurl: string }>`
  width: 4.0625rem;
  height: 1.375rem;
  margin: 0.25rem 0rem;
  background-image: url(${(props) => props.$imgurl});
  background-position: center;
  background-size: 4.0625rem 1.375rem;
  background-repeat: no-repeat;
`;
