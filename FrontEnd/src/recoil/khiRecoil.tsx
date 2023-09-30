import { atom } from "recoil";
import { recipeDetailType } from "./../components/recipe/recipeDetailComponent/recipeDetailType";
import {
  recipeFormType,
  productFormType,
} from "./../components/recipe/recipeCommonComponent/recipeFormType";

export const recipeFormState = atom<recipeFormType>({
  key: "recipeFormState",
  default: {
    recipeTitle: "",
    intro: "",
    relatedUrl: "",
  },
});

export const recipeFormImg = atom<string>({
  key: "recipeFormImg",
  default: "",
});
export const recipeFormContent = atom<string>({
  key: "recipeFormContent",
  default: "",
});
export const recipeFormProduct = atom<productFormType[]>({
  key: "recipeFormProduct",
  default: [],
});

export const recipeDetailInfo = atom<recipeDetailType>({
  key: "recipeDetailInfo",
  default: {
    rcpId: -1, // 레시피ID
    rcpName: "", // 레시피명
    rcpImg: "", // 레시피메인이미지
    user: {
      usrId: -1, // 유저정보
      nickname: "",
      usrImg: "",
    },
    createdAt: "", // 쓴 날짜
    rcpSimp: "", // 요약
    rcpDesc: "", // 본문
    rcpVideo: "", // 레시피 관련 영상
    likeCnt: 0, // 좋아요 갯수
    replyCnt: 0, // 댓글 갯수
    viewCnt: 0, // 조회수
    influence: false, // 인플루언서 여부
    like: false, // 좋아요 여부
  },
});
