import { useEffect, useState } from "react";

import RecipeCard from "@components/common/RecipeCard";
import PopularRecipeRoller from "./PopularRecipeRoller";

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
  const [popularRecipeList, setPopularRecipeList] = useState<recipeType[]>([]);
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);

  useEffect(() => {
    setRecipeList([
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
    ]);
    setPopularRecipeList([
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
    ]);
  }, []);

  return (
    <>
      <div>로고</div>
      <div>서치바</div>
      {/* 인기 레시피 컨테이너 */}
      <PopularRecipeRoller popularRecipeList={popularRecipeList} />
      {/* 전체 레시피 컨테이너 */}
      <div>
        <div>전체레시피</div>
        <div>
          {/* {recipeList  [] && */}
          {recipeList.map((recipeItem, index) => (
            <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
          ))}
        </div>
      </div>
      {/* 새 레시피 등록 버튼 */}
      <div>더보기</div>
      <div>새레시피 등록</div>
    </>
  );
};

export default RecipeList;
