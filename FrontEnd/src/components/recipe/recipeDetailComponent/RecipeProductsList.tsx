// import { useState } from "react";
import RecipeProductsListItem from "./RecipeProductsListItem";
import tw from "tailwind-styled-components";

const RecipeProductsList = () => {
  // const ingredients, setin

  return (
    <Container>
      <Title>
        <span className="text-common-peach">재료</span> <span>리스트</span>
      </Title>

      <RecipeProductsListItem />
      <RecipeProductsListItem />

      <TotalPriceBox>
        <div className="w-[4rem]">3,400원</div>
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
