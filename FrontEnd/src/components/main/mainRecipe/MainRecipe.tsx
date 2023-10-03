import MainRecipeHeader from "./MainRecipeHeader";
import MainRecipeContent from "./MainRecipeContent";
import { RecipeInfo } from "@/model/commonType";

const MainRecipe = ({ recipe }: { recipe: RecipeInfo }) => {
  return (
    <>
      <MainRecipeHeader />
      <MainRecipeContent recipe={recipe} />
    </>
  );
};

export default MainRecipe;
