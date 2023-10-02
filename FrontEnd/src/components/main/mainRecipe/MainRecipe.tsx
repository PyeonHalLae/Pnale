import MainRecipeHeader from "./MainRecipeHeader";
import MainRecipeContent from "./MainRecipeContent";
import { RecipeInfo } from "@/model/commonType";

const MainRecipe = ({ recipe }: { recipe: RecipeInfo }) => {
  console.log("recipe를 넘길거임", recipe);

  return (
    <>
      <MainRecipeHeader />
      <MainRecipeContent recipe={recipe} />
    </>
  );
};

export default MainRecipe;
