import { Dispatch, SetStateAction } from "react";
import { RecipeEditor } from "../recipeCommonComponent/RecipeEditor";
import tw from "tailwind-styled-components";
import CancelBtn from "./CancelBtn";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  recipeContentsState,
  recipeFormState,
  recipeImgState,
  recipeProductsState,
} from "@/recoil/khiRecoil";

// import axios from "axios";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
}

const RecipeCreateThird = ({ stepHandler }: Props) => {
  const [contents, setContents] = useRecoilState(recipeContentsState);
  const products = useRecoilValue(recipeProductsState);
  const recipeForm = useRecoilValue(recipeFormState);
  const recipeImg = useRecoilValue(recipeImgState);

  const resetForm = useResetRecoilState(recipeFormState);
  const restContents = useResetRecoilState(recipeContentsState);
  const restImg = useResetRecoilState(recipeImgState);
  const restProducts = useResetRecoilState(recipeProductsState);

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

    // axios
    //   .post("", FormData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + "key value",
    //     },
    //   })
    //   .then(() => {})
    //   .catch(() => {});
  };

  return (
    <Container>
      <CancelBtn />
      <RecipeEditor contents={contents} setContents={setContents} />
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
