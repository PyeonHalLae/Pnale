import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  return <div>RecipeDetail {recipeId}</div>;
};

export default RecipeDetail;
