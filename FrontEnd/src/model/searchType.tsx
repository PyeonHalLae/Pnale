import { CompProduct, ProductComp, RecipeInfo } from "./commonType";

export type searchData = {
  recipes?: RecipeInfo;
  relate?: searchDateRelate;
  search?: searchDateSearch;
};

export type searchDateRelate = {
  content: CompProduct[];
};

export type searchDateSearch = {
  content: ProductComp[];
};
