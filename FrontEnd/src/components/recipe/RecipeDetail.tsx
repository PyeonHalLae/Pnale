import { useParams } from "react-router-dom";

import RecipeCommentBox from "./recipeDetailComponent/RecipeCommentBox";
import RecipeDetailContent from "./recipeDetailComponent/RecipeDetailContent";
import RecipeRelatedVideo from "./recipeDetailComponent/RecipeRelatedVideo";
import RecipeProductsList from "./recipeDetailComponent/RecipeProductsList";
import RecipeDetailHeader from "./recipeDetailComponent/RecipeDetailHeader";
import RecipeDetailHeaderBar from "./recipeDetailComponent/RecipeDetailHeaderBar";

const RecipeDetail = () => {
  const { recipeId } = useParams();

  return (
    <div>
      <RecipeDetailHeaderBar />

      <RecipeDetailHeader mainImgUrl={"/img/test/너굴맨레시피.jpg"} />

      <RecipeProductsList />

      <RecipeRelatedVideo videoUrl="https://www.youtube.com/watch?v=oCduiXGcWdw" />

      <RecipeDetailContent content="이거이거 ㅎ" />

      <RecipeCommentBox />
      {recipeId}
    </div>
  );
};

export default RecipeDetail;
