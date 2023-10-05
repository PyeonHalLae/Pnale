import tw from "tailwind-styled-components";
import { Dispatch, SetStateAction, useState } from "react";

import RecipeProductsModalContent from "./RecipeProductsModalContent";
import RecipeCommonModal from "../recipeCommonComponent/RecipeCommonModal";
import { recipePrdInfoType } from "./recipeDetailType";
import styled from "styled-components";

const RecipeProductsListItem = ({
  ingredient,
  index,
  setBoxIngredients,
  isChanged,
}: {
  ingredient: recipePrdInfoType;
  index: number;
  setBoxIngredients: Dispatch<SetStateAction<recipePrdInfoType[]>>;
  isChanged: boolean;
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
            <ChangeBtn
              onClick={() => {
                setIsModalActive(true);
              }}
              $ischanged={isChanged}
            >
              변경하기
            </ChangeBtn>
          ) : (
            <ChangeBtnWhite $ischanged={isChanged}>변경불가</ChangeBtnWhite>
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

const ChangeBtn = styled.div<{ $ischanged: boolean }>`
  width: 3.875rem;
  height: 1rem;
  background-color: ${(props) => (props.$ischanged ? `#FB9B77` : `#FA709A`)};
  border-radius: 0.3125rem;
  text-align: center;
  color: white;
`;

const ChangeBtnWhite = styled(ChangeBtn)`
  background-color: white;
  color: #1e2b4f;
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
