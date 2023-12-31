import { recipeType } from "@/model/commonType";
import RecipeCard from "@components/common/RecipeCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeArea = ({ recipe }: { recipe: recipeType[] }) => {
  const navigate = useNavigate();

  // const [popularRecipeList, setPopularRecipeList] = useState<RecipeInfo[]>([]);
  const [newRecipeList, setNewRecipeList] = useState<recipeType[]>(null);

  useEffect(() => {
    const newRecipes = [];
    const seenRcpIds = new Set();

    recipe.forEach((recipeInfo) => {
      if (!seenRcpIds.has(recipeInfo.rcpId)) {
        seenRcpIds.add(recipeInfo.rcpId);
        newRecipes.push(recipeInfo);
      }
    });
    setNewRecipeList(newRecipes);
  }, [recipe]);

  return (
    <div className="mt-2 bg-white">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-orange">관련</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 레시피</span>
        </div>
        {recipe.length > 0 && (
          <button
            className="absolute right-0 inline-block pr-5 font-bold bottom-4 text-common-orange"
            onClick={() => navigate("/search-recipe", { state: { responseData: recipe } })}
          >
            더보기
          </button>
        )}
      </div>
      <div>
        {newRecipeList &&
          newRecipeList.map((recipeItem) => (
            <RecipeCard
              recipeInfo={recipeItem}
              key={recipeItem.rcpId + "-" + recipeItem.member.memberId}
            />
          ))}
        {recipe.length === 0 && <div className="pb-5 text-center">관련 레시피가 없습니다</div>}
      </div>
    </div>
  );
};

export default RecipeArea;
