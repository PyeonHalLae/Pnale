import tw from "tailwind-styled-components";

import { useState, useEffect } from "react";

import RecipeCreateFirst from "./recipeCreateComponent/RecipeCreateFirst";
import RecipeCreateSecond from "./recipeCreateComponent/RecipeCreateSecond";
import RecipeCreateThird from "./recipeCreateComponent/RecipeCreateThird";
import { recipeDetailType } from "./recipeDetailComponent/recipeDetailType";
import { useParams } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import {
  recipeFormState,
  recipeFormProduct,
  recipeFormImg,
  recipeFormContent,
} from "@/recoil/khiRecoil";

import axios from "axios";

const RecipeModify = () => {
  const [step, setStep] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(true);
  const setRecipeForm = useSetRecoilState(recipeFormState);
  const setRecipeContents = useSetRecoilState(recipeFormContent);
  const setRecipeImg = useSetRecoilState(recipeFormImg);
  const setRecipeProducts = useSetRecoilState(recipeFormProduct);

  const { recipeId } = useParams();

  useEffect(() => {
    axios
      .get("/api/recipe/detail", {
        params: {
          rcpId: recipeId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data);

        const newPrd = res.data.data.ingredients.map((ingredient) => {
          return {
            prdId: ingredient.prdId,
            prdName: ingredient.prdName,
            changeable: ingredient.changeable,
          };
        });
        setRecipeForm({
          rcpName: res.data.data.rcpName,
          rcpSimple: res.data.data.rcpSimple,
          rcpVideo: res.data.data.rcpVideo,
        });
        setRecipeContents(res.data.data.rcpDesc);
        setRecipeImg(res.data.data.rcpThumbnail);
        setRecipeProducts(newPrd);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const stepHandler = (step: string) => {
    setStep(step);
  };

  const stepSelector = {
    "1": <RecipeCreateFirst stepHandler={stepHandler} action="수정"></RecipeCreateFirst>,
    "2": <RecipeCreateSecond stepHandler={stepHandler} action="수정"></RecipeCreateSecond>,
    "3": (
      <RecipeCreateThird
        stepHandler={stepHandler}
        action="수정"
        recipeId={Number(recipeId)}
      ></RecipeCreateThird>
    ),
  };

  return <Container>{loading || stepSelector[step]}</Container>;
};

export default RecipeModify;

const Container = tw.div`
relative
mt-[3.4375rem]
min-w-[22.5rem]
max-w-[28.125rem]
h-[calc(100%-3.4375rem)]
`;
