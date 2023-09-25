import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { ProductCardProps } from "@components/common/ProductCard";
import { loadImage } from "@model/exportFucKDM";

type RelatedCardProps = ProductCardProps;

const RelatedCard: React.FC<RelatedCardProps> = ({ product, id }) => {
  useEffect(() => {
    loadImage(product.product.productImg, id);
  }, [product.product.productImg, id]);

  return (
    <Card>
      <div id={`${id}`} className="flex p-1.5 m-auto"></div>
      <Text>{product.product.productName.slice(product.product.productName.indexOf(")") + 1)}</Text>
      <Price>{product.product.price}원</Price>
    </Card>
  );
};

export default RelatedCard;

const Card = tw.div`
m-1
w-[140px]
inline-block
text-sm
text-center
`;

const Text = tw.p`
mx-2
whitespace-normal
`;

const Price = tw.p`
text-center
whitespace-normal
text-lg
`;
