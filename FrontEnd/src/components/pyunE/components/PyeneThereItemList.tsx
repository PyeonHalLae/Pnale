// import React from 'react'
import Slider from "react-slick";
// import tw from "tailwind-styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  slide: "div",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
};

const PyeneThereItemList = () => {
  return (
    <>
      <Slider {...settings} className="w-[calc(100%-20px)] h-[165px] mt-[18px] mx-auto">
        <div>aasdf</div>
        <div>aasdf</div>
        <div>aasdf</div>
        <div>aasdf</div>
        <div>aasdf</div>
        <div>aasdf</div>
        <div>aasdf</div>
      </Slider>
    </>
  );
};

export default PyeneThereItemList;
