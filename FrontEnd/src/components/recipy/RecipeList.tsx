import RecipeCard from "@components/common/RecipeCard";
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

const RecipeList = () => {
  const [recipeList, setRecipeList] = useState<recipeType[]>([
    {
      recipeTitle: "string",
      recipeImg: "string",
      viewCnt: 1,
      likeCnt: 1,
      commentCnt: 1,
      userName: "string",
      userImg: "string",
      createdDate: "2020.20.20",
    },
  ]);
  return (
    <>
      <div>서치바</div>
      <div>
        <div>인기레시피</div>
        <div>여기는 인기레시피 카드 (옆으로 넘어가게할것)</div>
      </div>
      <div>
        <div>전체레시피</div>
        <div>
          {/* {recipeList  [] && */}
          {recipeList.map((recipeItem) => (
            <>
              <RecipeCard recipeInfo={recipeItem} />
              <RecipeCard recipeInfo={recipeItem} />
              <RecipeCard recipeInfo={recipeItem} />
              <RecipeCard recipeInfo={recipeItem} />
              <RecipeCard recipeInfo={recipeItem} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
