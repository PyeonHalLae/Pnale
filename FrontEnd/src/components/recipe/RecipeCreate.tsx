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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

const RecipeCreate = () => {
  const [step, setStep] = useState<string>("1");
  const navigate = useNavigate();
  const resetForm = useResetRecoilState(recipeFormState);
  const restContents = useResetRecoilState(recipeFormContent);
  const restImg = useResetRecoilState(recipeFormImg);
  const restProducts = useResetRecoilState(recipeFormProduct);

  useEffect(() => {
    axios
      .get("/api/member/login", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {})
      .catch((error) => {
        const code = error.response.status;
        if (code === 401) {
          // 액세스토큰이 있으나 유효하지 않은 경우
          axios
            .get("/api/auth/member/login", {
              withCredentials: true,
            })
            .then(() => {})
            .catch(() => {
              ToastErrorMessage("로그인이 필요합니다");
              navigate("/sociallogin");
            });
        } else {
          ToastErrorMessage("로그인이 필요합니다");
          navigate("/sociallogin");
        }
      });

    resetForm();
    restContents();
    restImg();
    restProducts();
  }, []);

  const stepHandler = (step: string) => {
    setStep(step);
  };

  const stepSelector = {
    "1": <RecipeCreateFirst stepHandler={stepHandler} action="작성"></RecipeCreateFirst>,
    "2": <RecipeCreateSecond stepHandler={stepHandler} action="작성"></RecipeCreateSecond>,
    "3": <RecipeCreateThird stepHandler={stepHandler} action="작성"></RecipeCreateThird>,
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
