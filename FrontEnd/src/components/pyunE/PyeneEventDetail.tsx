import tw from "tailwind-styled-components";
import PyeneEventHeader from "./card/PyeneEventHeader";
// import React from "react";

const PyeneEventDetail = () => {
  return (
    <>
      <PyeneEventHeader />
      <EventMainBox></EventMainBox>
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
