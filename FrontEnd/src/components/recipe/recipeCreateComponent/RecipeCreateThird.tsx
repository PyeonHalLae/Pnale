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
import axios from "axios";
import { ToastBackMessage } from "@/model/toastMessageJHM";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
  action: string;
  recipeId?: number;
}

const RecipeCreateThird = ({ stepHandler, action, recipeId }: Props) => {
  const navigate = useNavigate();
  const [rcpDesc, setRcpDesc] = useRecoilState(recipeFormContent);
  const products = useRecoilValue(recipeFormProduct);
  const recipeForm = useRecoilValue(recipeFormState);
  const rcpThumbnail = useRecoilValue(recipeFormImg);

  const resetForm = useResetRecoilState(recipeFormState);
  const restContents = useResetRecoilState(recipeFormContent);
  const restImg = useResetRecoilState(recipeFormImg);
  const restProducts = useResetRecoilState(recipeFormProduct);

  const submitHandler = () => {
    // json으로 보내야함
    // recipeData = {
    //   ...recipeForm,
    //  레시피폼 : 제목, 1줄설명, 관련영상주소, products...
    //   rcpDesc: rcpDesc,
    //   rcpThumbnail: rcpThumbnail,
    //   userId: userId
    // }
    const productsData = products.map((product) => {
      return { prdId: product.prdId, changeable: product.changeable };
    });

    const data = {
      rcpName: recipeForm.rcpName, // 레시피명
      ingredients: productsData,
      // [
      //   // 재료 : 재료ID, 바꿀수 있는지 여부
      //   { prdId: 36, changeable: true },
      //   { prdId: 42, changeable: true },
      //   { prdId: 52, changeable: false },
      // ],
      rcpThumbnail: rcpThumbnail, // 대표 이미지
      rcpSimple: recipeForm.rcpSimple, // 요약
      rcpDesc: rcpDesc, // 본문
      rcpVideo: recipeForm.rcpVideo, // 레시피 관련 영상
    };
    console.log(data);
    if (action == "작성") {
      // 작성
      axios
        .post("/api/recipe/form", data)
        .then((res) => {
          if (res.data.code == "201") {
            console.log(res.data);
            ToastBackMessage("레시피 작성 완료");
            resetForm();
            restContents();
            restImg();
            restProducts();
            navigate(`/recipe/${res.data.data}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 수정
      axios
        .patch(`/api/recipe/form/${recipeId}`, data)
        .then((res) => {
          if (res.data.code == "201") {
            console.log(res.data);
            ToastBackMessage("레시피 수정 완료");
            resetForm();
            restContents();
            restImg();
            restProducts();
            navigate(`/recipe/${recipeId}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <CancelBtn action={action} />
      <div className="bg-white w-[100%] h-[calc(31.25rem-6px)] mb-[3rem] rounded-[0.625rem]">
        <RecipeEditor rcpDesc={rcpDesc} setRcpDesc={setRcpDesc} />
      </div>

      <BtnBox>
        <WhiteBtn
          onClick={() => {
            stepHandler("2");
          }}
        >
          이전으로
        </WhiteBtn>

        <BlueBtn onClick={submitHandler}>{action}완료</BlueBtn>
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
