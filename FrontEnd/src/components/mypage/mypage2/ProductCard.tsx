// import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";

interface EventType {
  state: boolean; //행사중이냐 아니냐
  type: string; //편의저명
  eventType: string; //행사중일때 해당하는 행사 ( 1+1 2+1)
}

interface EventImg {
  imgurl: string;
}

interface ProductType {
  name: string;
  price: number;
  img: string;
  category: string;
  mailState: boolean;
}

const EventState: EventType[] = [
  { state: true, type: "CU", eventType: "TPO" },
  { state: false, type: "EMART", eventType: "" },
  { state: true, type: "GS", eventType: "DISC" },
  { state: true, type: "SEVEN", eventType: "MORE" },
];

const productData: ProductType = {
  name: " 오리온) 포카칩 오리지널 66g 두줄테스트 응애 ㅇㅁㄴㄹㄴㅇㄹ",
  price: 2000,
  img: "/img/test/image61.png",
  category: "스낵",
  mailState: true,
};

const ProductCard = () => {
  const [eventUrl, setEventUrl] = useState<EventImg[]>([]);

  const eventImgCheck = async (eventState) => {
    const eventImgInfo: EventImg[] = [];

    eventState.map((eventInfo: EventType) => {
      const { state, type, eventType } = eventInfo;
      const eventImgUrl = state
        ? `/img/event/${type}-${eventType}.png`
        : `/img/event/${type}-NONE.png`;

      eventImgInfo.push({ imgurl: eventImgUrl });
    });

    await setEventUrl([...eventImgInfo]);
  };

  useEffect(() => {
    eventImgCheck(EventState);
  }, []);

  return (
    <>
      <BackSize>
        <Card>
          <ImageBox $imgurl="/img/test/image61.png" />
          <InfoBox>
            <ProductInfo>
              <ProductTitle>{productData.name}</ProductTitle>
              <div className="flex">
                <Price> {productData.price}원</Price>
                <Like />
              </div>
              <Category> {productData.category}</Category>
              <MailBox>
                메일 알림 받기
                <MailBtn
                  $mailState={
                    productData.mailState
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
    </>
  );
};

export default ProductCard;

const BackSize = tw.div` 
    w-full h-[120px]
    bg-white
    my-[10px]
    mx-auto
`;

const Card = styled.div`
  display: flex;
  height: 100%;
  width: 350px;
  margin: 0px auto;
`;

const ImageBox = styled.div<{ $imgurl: string }>`
  width: 110px;
  height: 115px;
  margin: auto 5px;
  background-image: url(${(props) => props.$imgurl});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const InfoBox = styled.div`
  display: flex;
  margin-left: 10px;
  width: calc(100% - 120px);
  height: 100%;
`;

const ProductInfo = styled.div`
  width: 75%;
  height: 85%;
  margin: auto 0px;
`;

const ProductTitle = styled.div`
  font-size: 10px;
  width: 136px;
  font-weight: normal;
  word-wrap: break-word;
  overflow: hidden; //숨기는거고
  display: -webkit-box; // webkit-box다
  -webkit-line-clamp: 2; //둘줄까지만보여라
  -webkit-box-orient: vertical; //... 해주는거
`;

const Price = tw.div`
  text-[15px] mx-[2px]
  w-[79px]
`;

const Like = styled.div`
  width: 15px;
  height: 20px;
  background-image: url("/img/btn/like-true.png");
  background-position: center;
  background-size: 15px 15px;
  background-repeat: no-repeat;
`;

const Category = styled.span`
  display: inline-block;
  margin: 2px 0px;
  min-width: 41px;
  max-width: 130px;
  overflow: hidden;
  word-break: break-all;
  padding: 1px 5px;
  height: 18px;
  font-size: 10px;
  text-align: center;
  border: 1px solid #1e2b4f;
  border-radius: 3px;
  color: #1e2b4f;
`;

const MailBox = styled.div`
  font-size: 10px;
  line-height: 18px;
  height: 15px;
  color: #aeb0b6;
  display: flex;
`;

const MailBtn = styled.div<{ $mailState: string }>`
  width: 15px;
  height: 15px;
  margin-left: 4px;
  background-image: url(${(props) => props.$mailState});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const EventInfo = styled.div`
  width: 35%;
  margin: auto 0px;
`;

const EventImg = styled.div<{ $imgurl: string }>`
  width: 65px;
  height: 22px;
  margin: 4px 0px;
  background-image: url(${(props) => props.$imgurl});
  background-position: center;
  background-size: 65px 22px;
  background-repeat: no-repeat;
`;
