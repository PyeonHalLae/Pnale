import { useState, useEffect } from "react";

import tw from "tailwind-styled-components";
import PyeneEventHeader from "./card/PyeneEventHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface eventListType {
  title: string;
  date: string;
  url: string;
  id: number;
}

const PyeneEventList = () => {
  const [eventList, setEventList] = useState<eventListType[]>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const changeIndexHanddler = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const temp2 = [
    {
      title: "호텔스닷컴 할인 받으세요글ㅁㅁㄴㅇ라ㅣㅓㅁㄴ아ㅣ럼ㄴ아ㅣ러",
      date: "2023.09.01",
      url: "/img/test/test-event-img.png",
      id: 1,
    },
    {
      title: "호텔스닷컴 할인 받으세요글ㅁㅁㄴㅇ라ㅣㅓㅁㄴ아ㅣ럼ㄴ아ㅣ러",
      date: "2023.09.01",
      url: "/img/test/test-event-img.png",
      id: 2,
    },
    {
      title: "호텔스닷컴 할인 받으세요글ㅁㅁㄴㅇ라ㅣㅓㅁㄴ아ㅣ럼ㄴ아ㅣ러",
      date: "2023.09.01",
      url: "/img/test/test-event-img.png",
      id: 3,
    },
    {
      title: "호텔스닷컴 할인 받으세요글ㅁㅁㄴㅇ라ㅣㅓㅁㄴ아ㅣ럼ㄴ아ㅣ러",
      date: "2023.09.01",
      url: "/img/test/test-event-img.png",
      id: 4,
    },
    {
      title: "호텔스닷컴 할인 받으세요글ㅁㅁㄴㅇ라ㅣㅓㅁㄴ아ㅣ럼ㄴ아ㅣ러",
      date: "2023.09.01",
      url: "/img/test/test-event-img.png",
      id: 5,
    },
    {
      title: "호텔스닷컴 할인 받으세요글ㅁㅁㄴㅇ라ㅣㅓㅁㄴ아ㅣ럼ㄴ아ㅣ러",
      date: "2023.09.01",
      url: "/img/test/test-event-img.png",
      id: 6,
    },
  ];

  useEffect(() => {
    setEventList(temp2);
  }, []);

  return (
    <>
      <PyeneEventHeader />
      <EventMainBox>
        {eventList &&
          eventList.map((value, index) => (
            <EventBanner
              key={value.id + index}
              $imgurl={value.url}
              onClick={() => changeIndexHanddler(index)}
            >
              <EventDetailInfo $isActive={activeIndex === index}>
                <EventTitle>{value.title}</EventTitle>
                <EventDate>{value.date}</EventDate>
                <EventDetilBtn onClick={() => navigate("" + value.id)}>자세히보기</EventDetilBtn>
              </EventDetailInfo>
            </EventBanner>
          ))}
      </EventMainBox>
    </>
  );
};

export default PyeneEventList;

const EventMainBox = tw.div`
  w-full
  h-[clac(100%-40px)]
  overflow-scroll
  grid
  grid-rows-1
  gap-3
  mt-[70px]
  mb-[15px]
  `;

const EventBanner = styled.div<{ $imgurl: string }>`
  position: relative;
  height: 150px;
  width: 100%;
  background-image: url(${(props) => props.$imgurl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const EventDetailInfo = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.6);
  display: ${(props) => (props.$isActive ? "block" : "none")};
`;

const EventTitle = styled.div`
  width: calc(100% - 20px);
  height: 84px;
  margin: 0px auto;
  padding: 30px 20px 0px 20px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px; //단어 간격 word-spacing 문자간격
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const EventDate = styled.div`
  width: calc(100% - 20px);
  margin: 0px auto;
  padding: 20px 20px 0px 20px;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const EventDetilBtn = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: white;
  border: 1px solid white;
  width: 100px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
  padding-top: 7px;
  z-index: 10;
`;
