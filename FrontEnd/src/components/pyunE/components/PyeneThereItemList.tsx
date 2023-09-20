// import React from 'react'
import Slider from "react-slick";
// import tw from "tailwind-styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PyeneProductCard from "../card/PyeneProductCard";

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
      <Slider {...settings} className="w-[calc(100%-40px)] h-[170px] mt-[18px] mx-auto border">
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
      </Slider>
    </>
  );
};

export default PyeneThereItemList;
