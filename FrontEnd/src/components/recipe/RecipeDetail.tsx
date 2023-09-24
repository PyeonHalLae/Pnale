import { useParams } from "react-router-dom";

import RecipeCommentBox from "./recipeDetailComponent/RecipeCommentBox";
import RecipeDetailContent from "./recipeDetailComponent/RecipeDetailContent";
import RecipeRelatedVideo from "./recipeDetailComponent/RecipeRelatedVideo";
import RecipeIngredientList from "./recipeDetailComponent/RecipeIngredientList";
import RecipeDetailHeader from "./recipeDetailComponent/RecipeDetailHeader";

const RecipeDetail = () => {
  const { recipeId } = useParams();

  return (
    <div>
      {recipeId}
      <div> 삭제 수정 버튼이 들어가야함 </div>

      <RecipeDetailHeader mainImgUrl={"/img/test/너굴맨레시피.jpg"} />

      <RecipeIngredientList />

      <RecipeRelatedVideo videoUrl="https://www.youtube.com/watch?v=oCduiXGcWdw" />

      <RecipeDetailContent content="이거이거 ㅎ" />

      <RecipeCommentBox />
    </div>
  );
};

export default RecipeDetail;
