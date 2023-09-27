// import React from 'react'
import Slider from "react-slick";
// import tw from "tailwind-styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PyeneProductCard from "../card/PyeneProductCard";

import { ProductComp } from "@/model/commonType";

const settings = {
  slide: "div",
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
};

const PyeneShopThreeView = ({
  $productList,
  $listViewType,
}: {
  $productList: ProductComp[];
  $listViewType: string;
}) => {
  return (
    <>
      <Slider {...settings} className="w-[calc(100%-34px)] h-[190px] mt-[18px] mx-auto">
        {$productList &&
          $productList.map(
            (value, index) =>
              index < 9 && (
                <PyeneProductCard key={index} $productInfo={value} $listType={$listViewType} />
              )
          )}
      </Slider>
    </>
  );
};

export default PyeneShopThreeView;
