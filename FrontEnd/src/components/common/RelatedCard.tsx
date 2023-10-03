import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { loadImage } from "@model/exportFucKDM";
import { CompProduct } from "@/model/commonType";

type RelatedCardProps = {
  product: CompProduct;
  id: string;
};

const RelatedCard: React.FC<RelatedCardProps> = ({ product, id }) => {
  useEffect(() => {
    loadImage(product.productImg, id);
  }, [product.productImg, id]);

  return (
    <Card>
      <div id={`${id}`} className="flex p-1.5 m-auto  max-h-44"></div>
      <Text>{product.productName.slice(product.productName.indexOf(")") + 1)}</Text>
      <Price>{product.price}원</Price>
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
