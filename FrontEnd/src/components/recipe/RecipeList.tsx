import { useEffect, useState } from "react";

import RecipeCard from "@components/common/RecipeCard";
// import PopularRecipeRoller from "./PopularRecipeRoller";

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
  // const [popularRecipeList, setPopularRecipeList] = useState<recipeType[]>();
  // setPopularRecipeList([
  //   {
  //     recipeTitle: "string",
  //     recipeImg: "string",
  //     viewCnt: 1,
  //     likeCnt: 1,
  //     commentCnt: 1,
  //     userName: "string",
  //     userImg: "string",
  //     createdDate: "2020.20.20",
  //     // recipeId 도 받아와야함
  //   },
  // ]);

  const [recipeList, setRecipeList] = useState<recipeType[]>([]);

  useEffect(() => {
    setRecipeList([
      {
        recipeTitle: "string",
        recipeImg: "string",
        viewCnt: 1,
        likeCnt: 1,
        commentCnt: 1,
        userName: "string",
        userImg: "string",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
    ]);
  }, []);

  return (
    <>
      <div>서치바</div>
      <div>
        <div>인기레시피</div>
        <div>여기는 인기레시피 카드 (옆으로 넘어가게할것)</div>
        {/* <PopularRecipeRoller $popularRecipeList={popularRecipeList} /> */}
      </div>
      <div>
        <div>전체레시피</div>
        <div>
          {/* {recipeList  [] && */}
          {recipeList.map((recipeItem, index) => (
            <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
