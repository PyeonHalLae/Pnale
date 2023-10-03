import { useParams } from "react-router-dom";

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
  // const [bottomMenuState, setBottomMenuState] = useState<boolean>(true);
  // const BottomMenuStateHandler = () => {
  //   setBottomMenuState((bottomMenuState) => {
  //     return !bottomMenuState;
  //   });
  // };
  //   <BottomMenu
  //   $selectRecipeId={Number(recipeId)}
  //   BottomMenuStateHandler={BottomMenuStateHandler}
  // ></BottomMenu>

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div>
          <RecipeDetailHeaderBar recipeId={recipeInfo.rcpId} myRecipe={recipeInfo.myRecipe} />

          <RecipeDetailHeader recipeInfo={recipeInfo} />

          <RecipeProductsList ingredients={recipeInfo.ingredients} />
          {/* 레시피 재료 추가해야함 */}
          <RecipeRelatedVideo videoUrl={recipeInfo.rcpVideo} />

          <RecipeDetailContent content={recipeInfo.rcpDesc} />

          <RecipeCommentBox recipeId={Number(recipeId)} />
          {/* <BottomMenu
            $selectRecipeId={Number(recipeId)}
            BottomMenuStateHandler={BottomMenuStateHandler}
          ></BottomMenu> */}
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
