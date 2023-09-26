import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";

import RecipeProductsModalContent from "../recipeCommonComponent/RecipeProductsModalContent";
import RecipeCommonModal from "../recipeCommonComponent/RecipeCommonModal";
// import { useRecoilValue } from "recoil";
// import { ingredientState } from "@/recoil/khiRecoil";

const RecipeProductsListItem = () => {
  const [isChangable, setIsChangable] = useState<boolean>();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  // const keyword = useRecoilValue(ingredientState);

  useEffect(() => {
    setIsChangable(true);
  }, []);

  return (
    <Container>
      {isModalActive && (
        <RecipeCommonModal
          setModal={setIsModalActive}
          width="20"
          height="32"
          element={<RecipeProductsModalContent />}
        />
      )}
      <ProductInfo>
        <OrderNumBox>1.</OrderNumBox>

        <NameBox>짜파게티</NameBox>

        <ChangeBtnBox>
          {isChangable ? (
            <ChangBtn
              onClick={() => {
                setIsModalActive(true);
              }}
            >
              변경하기
            </ChangBtn>
          ) : (
            <ChangeBtnWhite>변경불가</ChangeBtnWhite>
          )}
        </ChangeBtnBox>

        <PriceBox>1,000원</PriceBox>
      </ProductInfo>

      <StickerBox>스티커들어감</StickerBox>
    </Container>
  );
};

export default RecipeProductsListItem;

const Container = tw.div`
text-[0.75rem]
mx-[0.5rem]
my-[.3125rem]
`;
const ProductInfo = tw.div`
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
