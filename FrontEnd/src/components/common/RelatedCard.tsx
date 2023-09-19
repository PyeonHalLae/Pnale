import React from "react";
import tw from "tailwind-styled-components";

const RelatedCard = () => {
  return (
    <Card>
      <img src="/img/test/relatedProduct.png" alt="연관상품" />
      <Text>포칩 테토칩 포테토칩포테토칩</Text>
      <Price>2,000원</Price>
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
