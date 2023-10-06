// import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

interface bannerType {
  bannerId: number;
  bannerName: string;
  corpType: null | string;
  endDate: string;
  fullImg: string;
  startDate: string;
  thumbnailImg: string;
}

const PyeneShopBanner = ({ $bannerList }: { $bannerList: bannerType[] }) => {
  const navigate = useNavigate();
  const { pyenType } = useParams<string>();
  const [slideState, setSlideState] = useState({ activeSlide: 0, activeSlide2: 0 });
  const [slideImgSize, setSlideImgSize] = useState<number>();
  const [bannerList, setBannerList] = useState<bannerType[]>();

  const slickRef = useRef<Slider>(null);

  const settings = {
    slide: "div",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    beforeChange: (current: number, next: number) =>
      setSlideState({ activeSlide: next, activeSlide2: current }),
  };

  useEffect(() => {
    setSlideImgSize(5);
    setBannerList($bannerList);
    slickRef.current.slickGoTo(0);
  }, [$bannerList]);

  const EventPageMoveHandler = () => {
    navigate("EVENT");
  };

  const DetailPageMoveHandler = (banner: bannerType) => {
    navigate("/pyenE/" + pyenType + "/EVENT/" + banner.bannerId, { state: banner });
  };

  return (
    <div className="relative w-full h-[calc(100%-52px)]">
      <BannerAddBtn onClick={EventPageMoveHandler} src="/img/btn/create-recipe-white.png" />
      <SlideSizeInfo>
        {slideState.activeSlide + 1} / {slideImgSize}
      </SlideSizeInfo>
      <CustomSlick {...settings} className="w-full h-full" ref={slickRef}>
        {bannerList &&
          bannerList.map((value, index) => {
            return (
              <SlideImage
                key={index}
                $urlImg={value.thumbnailImg}
                onClick={() => DetailPageMoveHandler(value)}
              ></SlideImage>
            );
          })}
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
