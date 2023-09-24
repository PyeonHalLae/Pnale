// import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const PyeneShopBanner = () => {
  const navigate = useNavigate();
  const { pyenType } = useParams<string>();
  const [slideState, setSlideState] = useState({ activeSlide: 0, activeSlide2: 0 });
  const [slideImgSize, setSlideImgSize] = useState<number>();

  const settings = {
    slide: "div",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: number, next: number) =>
      setSlideState({ activeSlide: next, activeSlide2: current }),
  };

  const urlImgTmp = "/img/test/너굴맨레시피.jpg";

  useEffect(() => {
    setSlideImgSize(5);
  });

  const EventPageMoveHandler = () => {
    navigate("EVENT");
  };

  return (
    <div className="relative w-full h-[calc(100%-52px)]">
      <BannerAddBtn onClick={EventPageMoveHandler} src="/img/btn/create-recipe-white.png" />
      <SlideSizeInfo>
        {slideState.activeSlide + 1} / {slideImgSize}
      </SlideSizeInfo>
      <CustomSlick {...settings} className="w-full h-full">
        <SlideImage $urlImg={urlImgTmp}></SlideImage>
        <div>{pyenType} 배너 입니다 </div>
        <div>{pyenType} 배너 입니다 </div>
        <div>{pyenType} 배너 입니다 </div>
        <div>{pyenType} 배너 입니다 </div>
      </CustomSlick>
    </div>
  );
};

export default PyeneShopBanner;

const CustomSlick = styled(Slider)`
  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 20px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: black;
    }
  }
`;

const SlideSizeInfo = tw.div`
  absolute
  z-10
  bottom-[10px]
  bg-[rgba(30,43,79,0.6)]
  w-12
  p-[2px]
  h-[19px]
  leading-4
  text-center
  rounded-xl
  text-[12px]
  left-[10px]
  text-white
`;

const SlideImage = styled.div<{ $urlImg: string }>`
  background-image: url(${(props) => props.$urlImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 175px;
`;

const BannerAddBtn = tw.img`
  absolute
  right-2
  bottom-2
  w-[36px]
  h-[36px]
  z-10
  drop-shadow-[0px_0px_3px_rgba(0,0,0,0.4)]
`;
