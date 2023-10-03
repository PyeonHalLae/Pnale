// import { useState } from "react";
import RecipeProductsListItem from "./RecipeProductsListItem";
import tw from "tailwind-styled-components";
import { recipePrdInfoType } from "./recipeDetailType";
import { useEffect } from "react";
import { useState } from "react";

const RecipeProductsList = ({ ingredients }: { ingredients: recipePrdInfoType[] }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {}, [ingredients]);

  return (
    <Container>
      <Title>
        <span className="text-common-peach">재료</span> <span>리스트</span>
      </Title>
      {ingredients.length !== 0 &&
        ingredients.map((ingredient, index) => {
          return (
            <RecipeProductsListItem key={ingredient.prdId} index={index} ingredient={ingredient} />
          );
        })}

      <TotalPriceBox>
        <div className="w-[4rem]">{totalPrice}원</div>
        <div className="w-[4.5rem] mr-[.625rem] justify-center">총 가격</div>
      </TotalPriceBox>
    </Container>
  );
};

export default RecipeProductsList;

const Container = tw.div`
bg-white 
my-[.625rem] 
pb-[.3125rem]
text-common-text-color
`;
const Title = tw.div`
px-[1.875rem] 
py-[0.625rem]
text-[1.25rem] 
`;
const TotalPriceBox = tw.div`
flex 
flex-row-reverse
text-center
items-center
border-t-[0.0625rem]
pt-[0.5rem]
mt-[0.5rem]
mb-[0.3125rem]
mx-[0.5rem]
`;
