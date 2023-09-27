import { atom } from "recoil";
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

export const recipeImgState = atom<string>({
  key: "recipeImgState",
  default: "",
});
export const recipeContentsState = atom<string>({
  key: "recipeContentsState",
  default: "",
});
export const recipeProductsState = atom<productFormType[]>({
  key: "recipeProductsState",
  default: [],
});
