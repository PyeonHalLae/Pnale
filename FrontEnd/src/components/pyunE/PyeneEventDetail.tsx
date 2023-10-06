import tw from "tailwind-styled-components";
import PyeneEventHeader from "./card/PyeneEventHeader";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface eventListType {
  bannerId: number;
  bannerName: string;
  startDate: string;
  endDate: string | null;
  corpType: null;
  thumbnailImg: string;
  fullImg: string;
}

const PyeneEventDetail = () => {
  const location = useLocation();
  const [fullImgSrc, setFullImgSrc] = useState<string>();

  useEffect(() => {
    const stateEvent = location.state as eventListType;
    const fullurl = stateEvent.fullImg;
    setFullImgSrc(fullurl);
  }, [location]);

  return (
    <>
      <PyeneEventHeader />
      <EventMainBox>
        <img src={fullImgSrc} />
      </EventMainBox>
    </>
  );
};

export default PyeneEventDetail;

const EventMainBox = tw.div`
  w-full
  h-[calc(100%-40px)]
  overflow-scroll
  mt-[70px]
  mb-[15px]
  `;
