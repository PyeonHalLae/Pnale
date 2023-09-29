import tw from "tailwind-styled-components";

import { useState } from "react";

import RecipeCreateFirst from "./recipeCreateComponent/RecipeCreateFirst";
import RecipeCreateSecond from "./recipeCreateComponent/RecipeCreateSecond";
import RecipeCreateThird from "./recipeCreateComponent/RecipeCreateThird";
// import { useParams } from "react-router-dom";
// import axios from "axios";

const RecipeModify = () => {
  const [step, setStep] = useState<string>("1");
  // const { recipeId } = useParams();

  // useEffect(() => {
  //   axios
  //     .get("/api/recipe/detail", {
  //       params: {
  //         rcpId: recipeId,
  //       },
  //     })
  //     .then((res) => {})
  //     .catch((err) => {});
  // }, [recipeId]);

  const stepHandler = (step: string) => {
    setStep(step);
  };

  const stepSelector = {
    "1": <RecipeCreateFirst stepHandler={stepHandler}></RecipeCreateFirst>,
    "2": <RecipeCreateSecond stepHandler={stepHandler}></RecipeCreateSecond>,
    "3": <RecipeCreateThird stepHandler={stepHandler}></RecipeCreateThird>,
  };

  return <Container>{stepSelector[step]}</Container>;
};

export default RecipeModify;

const Container = tw.div`
relative
mt-[3.4375rem]
min-w-[22.5rem]
max-w-[28.125rem]
h-[calc(100%-3.4375rem)]
`;
