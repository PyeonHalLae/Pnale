import tw from "tailwind-styled-components";

import { useState } from "react";

import RecipeCreateFirst from "./recipeCreateComponent/RecipeCreateFirst";
import RecipeCreateSecond from "./recipeCreateComponent/RecipeCreateSecond";
import RecipeCreateThird from "./recipeCreateComponent/RecipeCreateThird";
import { recipeFormType, productFormType } from "./recipeCommonComponent/recipeFormType";
import { useParams } from "react-router-dom";

const RecipeModify = () => {
  const [step, setStep] = useState<string>("1");
  const [recipeForm, setRecipeForm] = useState<recipeFormType>({
    recipeTitle: "",
    intro: "",
    relatedUrl: "",
    // products: [],
  });

  const [contents, setContents] = useState<string>("");
  const [recipeImg, setRecipeImg] = useState<string>("");
  const [products, setProducts] = useState<productFormType[]>([]);
  const { recipeId } = useParams();

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
        products={products}
        setProducts={setProducts}
      ></RecipeCreateSecond>
    ),
    "3": (
      <RecipeCreateThird
        stepHandler={stepHandler}
        recipeForm={recipeForm}
        contents={contents}
        setContents={setContents}
        recipeImg={recipeImg}
      ></RecipeCreateThird>
    ),
  };

  return (
    <Container>
      {recipeId}
      {stepSelector[step]}
    </Container>
  );
};

export default RecipeModify;

const Container = tw.div`
relative
mt-[3.4375rem]
min-w-[22.5rem]
max-w-[28.125rem]
h-[calc(100%-3.4375rem)]
`;
