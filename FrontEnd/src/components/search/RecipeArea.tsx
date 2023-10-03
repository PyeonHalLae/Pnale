import { RecipeInfo } from "@/model/commonType";
import RecipeCard from "@components/common/RecipeCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeArea = ({ recipe }: { recipe: RecipeInfo }) => {
  const navigate = useNavigate();

  // const [popularRecipeList, setPopularRecipeList] = useState<RecipeInfo[]>([]);
  // const [recipeList, setRecipeList] = useState<RecipeInfo[]>([]);

  console.log("recipe", recipe);

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
        {/* {recipeList.map((recipeItem, index) => (
          <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
        ))} */}
      </div>
    </div>
  );
};

export default RecipeArea;
