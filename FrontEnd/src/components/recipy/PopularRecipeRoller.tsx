import { useState } from "react";

interface recipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
}

const PopularRecipeRoller = ({ popularRecipeList }: { popularRecipeList: recipeType[] }) => {
  return <div></div>;
};

export default PopularRecipeRoller;
