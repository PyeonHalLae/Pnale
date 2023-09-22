import { mainCard } from "@/model/commonType";
import React from "react";
import tw from "tailwind-styled-components";

type ProductCardProps = {
  data: mainCard;
};

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  console.log(data);

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
        <div className="flex">
          <Categori>스낵</Categori>
          <img
            src="/img/icons/filledStar.png"
            alt="즐겨찾기"
            className="absolute right-0 inline-block w-4 m-1.5"
          />
        </div>
        <p className="mx-1.5 text-sm max-w-130 line-clamp-1">
          {data.productResponseDto.productName}
        </p>
        <Price>2,000</Price>
        <span className="mr-4">원</span>
      </TextArea>
    </Card>
  );
};

export default ProductCard;

const Card = tw.div`
shadow-[0px_0px_2px_#0000003f]
`;

const ImageArea = tw.div`
`;

const TextArea = tw.div`
relative
bg-common-back-color
text-common-text-color
`;

const Categori = tw.p`
pt-[2px]
font-bold
text-xs
border-2
border-common-text-color
px-1
m-1
rounded
bg-white
max-w-[120px]
hover:line-clamp-none
line-clamp-1
`;

const Price = tw.div`
font-bold
text-xl
ml-1.5
mr-0.5
inline-block
`;
