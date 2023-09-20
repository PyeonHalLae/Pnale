// import React from 'react'

// import styled from "styled-components";
import tw from "tailwind-styled-components";

const PyeneProductCard = () => {
  return (
    <>
      <BackSize>
        <ImageBox>
          <ProductEventImg />
          <ProductImg src="/img/test/image61.png" />
        </ImageBox>
      </BackSize>
    </>
  );
};

export default PyeneProductCard;

const BackSize = tw.div`
  w-[130px]
  h-[170px]
  bg-common-back-color
  mx-auto
  shadow-[0px_0px_2px_rgba(0,0,0,0.2)]
`;

const ImageBox = tw.div`
  w-full
  h-[110px]
  bg-white
`;

const ProductImg = tw.img`
  w-[92px]
  h-[95px]
  mx-auto

`;

const ProductEventImg = tw.img``;
