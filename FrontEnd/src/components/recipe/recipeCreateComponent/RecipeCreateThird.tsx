import { Dispatch, SetStateAction } from "react";
import { RecipeEditor } from "../recipeCommonComponent/RecipeEditor";
import tw from "tailwind-styled-components";
import CancelBtn from "./CancelBtn";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  recipeFormContent,
  recipeFormState,
  recipeFormImg,
  recipeFormProduct,
} from "@/recoil/khiRecoil";

import { useNavigate } from "react-router-dom";
import { customAxios } from "./../../../api/customAxios";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
}

const RecipeCreateThird = ({ stepHandler }: Props) => {
  const navigate = useNavigate();
  const [contents, setContents] = useRecoilState(recipeFormContent);
  const products = useRecoilValue(recipeFormProduct);
  const recipeForm = useRecoilValue(recipeFormState);
  const recipeImg = useRecoilValue(recipeFormImg);

  const resetForm = useResetRecoilState(recipeFormState);
  const restContents = useResetRecoilState(recipeFormContent);
  const restImg = useResetRecoilState(recipeFormImg);
  const restProducts = useResetRecoilState(recipeFormProduct);

  const submitHandler = () => {
    console.log(recipeForm);
    console.log("레시피폼");

    console.log(products);
    console.log("상품리스트");

    console.log(recipeImg);
    console.log("레시피이미지");

    console.log(contents);
    console.log("레시피내용");

    resetForm();
    restContents();
    restImg();
    restProducts();
    // json으로 보내야함
    // recipeData = {
    //   ...recipeForm,
    //  레시피폼 : 제목, 1줄설명, 관련영상주소, products...
    //   contents: contents,
    //   recipeImg: recipeImg,
    //   userId: userId
    // }
    const productsData = products.map((product) => {
      return { prdId: product.productId, changeable: product.isChangeable };
    });

    const data = {
      rcpName: recipeForm.recipeTitle, // 레시피명
      ingredients: productsData,
      // [
      //   // 재료 : 재료ID, 바꿀수 있는지 여부
      //   { prdId: 36, changeable: true },
      //   { prdId: 42, changeable: true },
      //   { prdId: 52, changeable: false },
      // ],
      rcpThumb: recipeImg, // 대표 이미지
      rcpSimp: recipeForm.intro, // 요약
      rcpDesc: contents, // 본문
      rcpVideo: recipeForm.relatedUrl, // 레시피 관련 영상
    };
    console.log(data);

    customAxios
      .post("/api/recipe/form", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        alert("작성성공");
        resetForm();
        restContents();
        restImg();
        restProducts();
        navigate(`/recipe/${res.data.rcpId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <CancelBtn />
      <div className="bg-white w-[100%] h-[calc(31.25rem-6px)] mb-[3rem] rounded-[0.625rem]">
        <RecipeEditor contents={contents} setContents={setContents} />
      </div>

      <BtnBox>
        <WhiteBtn
          onClick={() => {
            stepHandler("2");
          }}
        >
          이전으로
        </WhiteBtn>

        <BlueBtn onClick={submitHandler}>작성완료</BlueBtn>
      </BtnBox>
    </Container>
  );
};

export default RecipeCreateThird;

const Container = tw.div`
flex
flex-col
w-[100%]
px-[2.5rem]
justify-center
items-center
`;

const BtnBox = tw.div`
flex
w-[100%]
relative
itmes-center
justify-between
`;

const BlueBtn = tw.div`
justify-center
text-center
w-[8.9375rem]
h-[2.5rem]
rounded-[0.625rem]
py-[.75rem]

bg-common-text-color
text-white
text-[0.9375rem]
shadow
`;

const WhiteBtn = tw.div`
justify-center
text-center
w-[8.9375rem]
h-[2.5rem]
rounded-[0.625rem]
py-[.75rem]

bg-white
text-common-text-color
text-[0.9375rem]
shadow
`;
