// import { useState } from "react";
import RecipeProductsListItem from "./RecipeProductsListItem";
import tw from "tailwind-styled-components";
import { recipePrdInfoType } from "./recipeDetailType";
import { useEffect } from "react";
import { useState } from "react";

const RecipeProductsList = ({ ingredients }: { ingredients: recipePrdInfoType[] }) => {
  const [boxIngredients, setBoxIngredients] = useState<recipePrdInfoType[]>(ingredients);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    if (boxIngredients.length !== 0) {
      setTotalPrice(
        boxIngredients.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
      );
    }
  }, [boxIngredients]);

  return (
    <Container>
      <Title>
        <span className="text-common-peach">재료</span> <span>리스트</span>
      </Title>
      {boxIngredients.length !== 0 &&
        boxIngredients.map((ingredient, index) => {
          return (
            <RecipeProductsListItem
              key={ingredient.prdId}
              index={index}
              ingredient={ingredient}
              setBoxIngredients={setBoxIngredients}
              isChanged={ingredient === ingredients[index]}
            />
          );
        })}

      <TotalPriceBox>
        <div className="w-[5rem]">{totalPrice}원</div>
        <div className="w-[4rem]  justify-center">총 가격</div>
        {boxIngredients !== ingredients && (
          <div
            className="text-common-peach mr-[3.125rem] absolute left-[1.75rem]"
            onClick={() => {
              setBoxIngredients(ingredients);
            }}
          >
            <img className="w-[1.5rem]  inline" src="/img/btn/undo.png" alt="초기화" />
            변경 초기화
          </div>
        )}
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
relative
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
