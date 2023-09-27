import { Dispatch, SetStateAction } from "react";
import { RecipeEditor } from "../recipeCommonComponent/RecipeEditor";
import tw from "tailwind-styled-components";
import { recipeFormType } from "./../recipeCommonComponent/recipeFormType";
import CancelBtn from "./CancelBtn";
// import axios from "axios";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
  recipeForm: recipeFormType;
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
  recipeImg: string;
}

const RecipeCreateThird = ({
  stepHandler,
  contents,
  setContents,
  // recipeImg,
  recipeForm,
}: Props) => {
  const submitHandler = () => {
    console.log(recipeForm);

    // json으로 보내야함
    // recipeData = {
    //   ...recipeForm,
    //  레시피폼 : 제목, 1줄설명, 관련영상주소, products...
    //   contents: contents,
    //   recipeImg: recipeImg,
    //   userId: userId
    // }

    // axios
    //   .post(url, FormData, {
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
      <button
        onClick={() => {
          console.log(contents);
          console.log(recipeForm);
        }}
      >
        ㅎㅎㅎ
      </button>
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
