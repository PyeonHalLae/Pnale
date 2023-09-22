import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";

const RecipeIngredientListItem = () => {
  const [isChangable, setIsChangable] = useState<boolean>();

  useEffect(() => {
    setIsChangable(true);
  }, []);

  return (
    <Container>
      <IngredientInfo>
        <OrderNumBox>1.</OrderNumBox>

        <NameBox>짜파게티</NameBox>

        <ChangeBtnBox>
          {isChangable ? <ChangBtn>변경하기</ChangBtn> : <ChangeBtnWhite>변경불가</ChangeBtnWhite>}
        </ChangeBtnBox>

        <PriceBox>1,000원</PriceBox>
      </IngredientInfo>

      <StickerBox>스티커들어감</StickerBox>
    </Container>
  );
};

export default RecipeIngredientListItem;

const Container = tw.div`
text-[0.75rem]
mx-[0.5rem]
my-[.3125rem]
`;
const IngredientInfo = tw.div`
flex 
items-center 
text-center
`;

const OrderNumBox = tw.div`
w-[1.875rem]
`;
const NameBox = tw.div`
w-[calc(100%-10.5rem)]
text-left
`;

const ChangeBtnBox = tw.div`
w-[5rem] justify-start text-start
`;
const ChangBtn = tw.div`
w-[3.875rem]
h-[1rem]
bg-common-peach

rounded-[0.3125rem]

text-center
text-white
`;
const ChangeBtnWhite = tw(ChangBtn)`
bg-white
text-common-text-color
`;

const PriceBox = tw.div`
w-[3.625rem] 
`;

const StickerBox = tw.div`
w-[7rem]
h-[1.5rem]
ml-[1.875rem]
my-[0.25rem]
border-[1px]
border-common-bold-back-color
`;
