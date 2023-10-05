import tw from "tailwind-styled-components";

import { useState, useEffect } from "react";

import RecipeCreateFirst from "./recipeCreateComponent/RecipeCreateFirst";
import RecipeCreateSecond from "./recipeCreateComponent/RecipeCreateSecond";
import RecipeCreateThird from "./recipeCreateComponent/RecipeCreateThird";
import { useNavigate, useParams } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import {
  recipeFormState,
  recipeFormProduct,
  recipeFormImg,
  recipeFormContent,
} from "@/recoil/khiRecoil";

import axios from "axios";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

const RecipeModify = () => {
  const [step, setStep] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const setRecipeForm = useSetRecoilState(recipeFormState);
  const setRecipeContents = useSetRecoilState(recipeFormContent);
  const setRecipeImg = useSetRecoilState(recipeFormImg);
  const setRecipeProducts = useSetRecoilState(recipeFormProduct);

  const { recipeId } = useParams();

  // 처음 디테일 정보 받아올 때
  const loadDetailData = () => {
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
        if (res.data.data.myRecipe) {
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
        } else {
          // 본인 게시물이 아닐경우
          ToastErrorMessage("작성자만 수정할 수 있습니다.");
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // 로그인 여부 체크
    axios
      .get("/api/member/login", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        loadDetailData();
      })
      .catch((error) => {
        const code = error.response.status;
        if (code === 401) {
          // 액세스토큰이 있으나 유효하지 않은 경우
          axios
            .get("/api/auth/member/login", {
              withCredentials: true,
            })
            .then(() => {
              loadDetailData();
            })
            .catch(() => {
              ToastErrorMessage("로그인이 필요합니다");
              navigate("/sociallogin");
            });
        } else {
          ToastErrorMessage("로그인이 필요합니다");
          navigate("/sociallogin");
        }
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
