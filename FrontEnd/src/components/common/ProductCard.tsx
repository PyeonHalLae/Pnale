import { Main, MainEvent } from "@/model/commonType";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

type ProductCardProps = {
  product: Main;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [eventData, setEventData] = useState<MainEvent>();

  useEffect(() => {
    console.log("event", product.event);
    setEventData(product.event);
  }, []);

  return (
    <Card>
      <ImageArea>
        <img
          src={product.product.productImg}
          alt="제품사진"
          className="px-4.5 py-3 border-black boder-2 m-auto h-[200px]"
        />
        <div className="flex p-1.5 m-auto">
          {product.event.cutype !== null && (
            <StickerImg src={`/img/sticker/main/CU-${product.event.cutype}.png`}></StickerImg>
          )}
          {product.event.emarttype !== null && (
            <StickerImg src={`/img/sticker/main/EMART-${product.event.emarttype}.png`}></StickerImg>
          )}
          {product.event.gstype !== null && (
            <StickerImg src={`/img/sticker/main/GS-${product.event.gstype}.png`}></StickerImg>
          )}
          {product.event.seventype !== null && (
            <StickerImg src={`/img/sticker/main/SEVEN-${product.event.seventype}.png`}></StickerImg>
          )}
        </div>
      </ImageArea>
      <TextArea>
        <div className="flex">
          <Categori>{product.product.category}</Categori>
          <img
            src="/img/icons/filledStar.png"
            alt="즐겨찾기"
            className="absolute right-0 inline-block w-4 m-1.5"
          />
        </div>
        <p className="mx-1.5 text-sm max-w-130 line-clamp-1">
          {product.product.productName.slice(product.product.productName.indexOf(")") + 1)}
        </p>
        <Price>{product.product.price}</Price>
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

const StickerImg = tw.img`
mr-1.5
w-[23%]
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
