import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "@components/common/RecipeCard";
import { recipeType } from "@/model/commonType";

const SearchRecipe = () => {
  const location = useLocation();
  const [recipe, setRecipe] = useState<recipeType[]>();
  const [newRecipeList, setNewRecipeList] = useState<recipeType[]>(null);

  useEffect(() => {
    setRecipe(location.state.responseData);
  }, [location, recipe]);

  useEffect(() => {
    if (recipe) {
      const newRecipes = [];
      const seenRcpIds = new Set();

      recipe.forEach((recipeInfo) => {
        if (!seenRcpIds.has(recipeInfo.rcpId)) {
          seenRcpIds.add(recipeInfo.rcpId);
          newRecipes.push(recipeInfo);
        }
      });
      setNewRecipeList(newRecipes);
    }
  }, [recipe]);

  return (
    <div className="p-3.5 relative ">
      <div className="inline-block ">
        <span className="text-2xl font-bold text-center text-common-orange">관련</span>
        <span className="text-2xl font-bold text-center text-common-text-color"> 레시피</span>
      </div>
      {newRecipeList &&
        newRecipeList.map((recipeItem: recipeType) => (
          <RecipeCard
            recipeInfo={recipeItem}
            key={recipeItem.rcpId + "-" + recipeItem.member.memberId}
          />
        ))}
      {newRecipeList?.length === 0 && (
        <div className="pb-5 text-center">관련 레시피가 없습니다</div>
      )}
    </div>
  );
};

export default SearchRecipe;
