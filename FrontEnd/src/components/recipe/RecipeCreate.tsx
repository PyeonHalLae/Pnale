import tw from "tailwind-styled-components";

import { useState, useEffect } from "react";

import RecipeCreateFirst from "./recipeCreateComponent/RecipeCreateFirst";
import RecipeCreateSecond from "./recipeCreateComponent/RecipeCreateSecond";
import RecipeCreateThird from "./recipeCreateComponent/RecipeCreateThird";

import { useResetRecoilState } from "recoil";
import {
  recipeFormState,
  recipeFormProduct,
  recipeFormImg,
  recipeFormContent,
} from "@/recoil/khiRecoil";

const RecipeCreate = () => {
  const [step, setStep] = useState<string>("1");
  const resetForm = useResetRecoilState(recipeFormState);
  const restContents = useResetRecoilState(recipeFormContent);
  const restImg = useResetRecoilState(recipeFormImg);
  const restProducts = useResetRecoilState(recipeFormProduct);

  useEffect(() => {
    resetForm();
    restContents();
    restImg();
    restProducts();
  }, []);

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

export default RecipeCreate;

const Container = tw.div`
relative
mt-[3.4375rem]
min-w-[22.5rem]
max-w-[28.125rem]
h-[calc(100%-3.4375rem)]
`;
