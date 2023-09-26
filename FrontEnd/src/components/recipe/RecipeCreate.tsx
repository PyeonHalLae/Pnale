import tw from "tailwind-styled-components";

import { useState } from "react";

import RecipeCreateFirst from "./recipeCreateComponent/RecipeCreateFirst";
import RecipeCreateSecond from "./recipeCreateComponent/RecipeCreateSecond";
import RecipeCreateThird from "./recipeCreateComponent/RecipeCreateThird";
import { recipeFormType } from "./recipeCommonComponent/recipeFormType";

const RecipeCreate = () => {
  const [step, setStep] = useState<string>("1");
  const [recipeForm, setRecipeForm] = useState<recipeFormType>({
    recipeTitle: "",
    intro: "",
    relatedUrl: "",
    products: [],
  });
  const [contents, setContents] = useState<string>("");
  const [recipeImg, setRecipeImg] = useState<string>("");

  const FormChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeForm((recipeForm) => {
      return { ...recipeForm, [name]: value };
    });
  };

  const stepHandler = (step: string) => {
    setStep(step);
  };

  const stepSelector = {
    "1": (
      <RecipeCreateFirst
        stepHandler={stepHandler}
        recipeForm={recipeForm}
        recipeImg={recipeImg}
        setRecipeImg={setRecipeImg}
        FormChangeHandler={FormChangeHandler}
      ></RecipeCreateFirst>
    ),
    "2": (
      <RecipeCreateSecond
        stepHandler={stepHandler}
        recipeForm={recipeForm}
        FormChangeHandler={FormChangeHandler}
      ></RecipeCreateSecond>
    ),
    "3": (
      <RecipeCreateThird
        stepHandler={stepHandler}
        recipeForm={recipeForm}
        contents={contents}
        setContents={setContents}
      ></RecipeCreateThird>
    ),
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
