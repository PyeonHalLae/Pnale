import { useLocation, useParams } from "react-router-dom";

import RecipeCommentBox from "./recipeDetailComponent/RecipeCommentBox";
import RecipeDetailContent from "./recipeDetailComponent/RecipeDetailContent";
import RecipeRelatedVideo from "./recipeDetailComponent/RecipeRelatedVideo";
import RecipeProductsList from "./recipeDetailComponent/RecipeProductsList";
import RecipeDetailHeader from "./recipeDetailComponent/RecipeDetailHeader";
import RecipeDetailHeaderBar from "./recipeDetailComponent/RecipeDetailHeaderBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { recipeDetailType } from "./recipeDetailComponent/recipeDetailType";

const RecipeDetail = () => {
  const location = useLocation();
  const { recipeId } = useParams();
  const [recipeInfo, setRecipeInfo] = useState<recipeDetailType>();
  const [loading, setLoading] = useState<boolean>(true);
  // const [bottomMenuState, setBottomMenuState] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/api/recipe/detail", {
        params: {
          rcpId: recipeId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setRecipeInfo(() => {
          return res.data.data;
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div>
          <RecipeDetailHeaderBar
            recipeId={recipeInfo.rcpId}
            myRecipe={recipeInfo.myRecipe}
            // setRecipeInfo={setRecipeInfo}
          />

          <RecipeDetailHeader recipeInfo={recipeInfo} />

          <RecipeProductsList ingredients={recipeInfo.ingredients} />
          {/* 레시피 재료 추가해야함 */}
          <RecipeRelatedVideo videoUrl={recipeInfo.rcpVideo} />

          <RecipeDetailContent content={recipeInfo.rcpDesc} />

          <RecipeCommentBox recipeId={Number(recipeId)} />
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
