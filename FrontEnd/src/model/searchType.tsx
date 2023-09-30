import { CompProduct, ProductComp } from "./commonType";

export type searchData = {
  recipes?: [];
  relate: searchDateRelate;
  search: searchDateSearch;
};

export type searchDateRelate = {
  content: CompProduct[];
};

export type searchDateSearch = {
  content: ProductComp[];
};
