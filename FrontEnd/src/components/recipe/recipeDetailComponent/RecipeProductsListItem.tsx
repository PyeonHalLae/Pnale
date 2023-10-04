import tw from "tailwind-styled-components";
import { Dispatch, SetStateAction, useState } from "react";

import RecipeProductsModalContent from "./RecipeProductsModalContent";
import RecipeCommonModal from "../recipeCommonComponent/RecipeCommonModal";
import { recipePrdInfoType } from "./recipeDetailType";

const RecipeProductsListItem = ({
  ingredient,
  index,
  setBoxIngredients,
}: {
  ingredient: recipePrdInfoType;
  index: number;
  setBoxIngredients: Dispatch<SetStateAction<recipePrdInfoType[]>>;
}) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  return (
    <Container>
      {isModalActive && (
        <RecipeCommonModal
          setModal={setIsModalActive}
          width="22"
          height="36"
          element={
            <RecipeProductsModalContent index={index} setBoxIngredients={setBoxIngredients} />
          }
        />
      )}
      <ProductInfo>
        <OrderNumBox>{index + 1}.</OrderNumBox>

        <NameBox>{ingredient.prdName}</NameBox>

        <ChangeBtnBox>
          {ingredient.changeable ? (
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

        <PriceBox>{ingredient.price}원</PriceBox>
      </ProductInfo>

      <StickerBox>
        <div className="flex p-1.5 m-auto">
          {ingredient.cutype !== null && (
            <StickerImg src={`/img/sticker/main/CU-${ingredient.cutype}.png`}></StickerImg>
          )}
          {ingredient.emarttype !== null && (
            <StickerImg src={`/img/sticker/main/EMART-${ingredient.emarttype}.png`}></StickerImg>
          )}
          {ingredient.gstype !== null && (
            <StickerImg src={`/img/sticker/main/GS-${ingredient.gstype}.png`}></StickerImg>
          )}
          {ingredient.seventype !== null && (
            <StickerImg src={`/img/sticker/main/SEVEN-${ingredient.seventype}.png`}></StickerImg>
          )}
        </div>
      </StickerBox>
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
w-[9rem]
h-[1.5rem]
ml-[1.875rem]
mb-[1rem]

`;

const StickerImg = tw.img`
mr-1.5
w-[23%]
`;
