import RecipeCard from "@components/common/RecipeCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface recipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
  recipeId: number;
}

const RecipeArea = ({ recipes }) => {
  const navigate = useNavigate();

  const [popularRecipeList, setPopularRecipeList] = useState<recipeType[]>([]);
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);

  useEffect(() => {
    console.log("popularRecipeList", popularRecipeList);
    console.log("recipes", recipes);

    setRecipeList([
      {
        recipeTitle:
          "두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다",
        recipeImg: "/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        recipeId: 1,
        // recipeId 도 받아와야함
      },
    ]);
    setPopularRecipeList([
      {
        recipeTitle: "두줄제목두줄제목두줄제목두줄제목두줄제목두줄제목두줄제목두줄제목",
        recipeImg: "/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        recipeId: 1,
        // recipeId 도 받아와야함
      },
    ]);
  }, []);
  return (
    <div className="bg-white">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-orange">관련</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 레시피</span>
        </div>
        <button
          className="absolute right-0 inline-block pr-5 font-bold bottom-4 text-common-orange"
          onClick={() => navigate("/search-recipe")}
        >
          더보기
        </button>
      </div>
      <div>
        {recipeList.map((recipeItem, index) => (
          <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
        ))}
      </div>
    </div>
  );
};

export default RecipeArea;
