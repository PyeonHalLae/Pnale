import React from "react";
import tw from "tailwind-styled-components";

const ProductCard = () => {
  return (
    <Card>
      <ImageArea>
        <img
          src="/img/test/testProduct.png"
          alt="제품사진"
          className="px-4.5 py-3 border-black boder-2"
        />
        <div className="mb-1.5 px-1.5 border-2 border-black">스티커 구간</div>
      </ImageArea>
      <TextArea>
        <Categori>스낵</Categori>
        <img
          src="/img/icons/filledStar.png"
          alt="즐겨찾기"
          className="absolute right-0 inline-block w-5 m-1.5"
        />
        <div className="mx-1.5 text-sm mt-1">얄리얄리 얄라셩 얄라리얄라 얄라셩</div>
        <Price>2,000</Price>
        <span className="mr-4">원</span>
      </TextArea>
    </Card>
  );
};

export default ProductCard;

const Card = tw.div`
border-common-back-color
border-2
shadow-roun
`;

const ImageArea = tw.div`
`;

const TextArea = tw.div`
relative
bg-common-back-color
text-common-text-color
`;

const Categori = tw.div`
font-bold
text-xs
border-2
border-black
inline-block
px-1
m-1
rounded
bg-white
`;

const Price = tw.div`
font-bold
text-xl
ml-1.5
mr-0.5
inline-block
`;
