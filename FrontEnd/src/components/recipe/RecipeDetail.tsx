import CommentBox from "./RecipeDetail/CommentBox";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  return (
    <div>
      RecipeDetail {recipeId}
      <CommentBox />
    </div>
  );
};

export default RecipeDetail;
