import CommentBox from "./recipeDetail/CommentBox";
import { useParams } from "react-router-dom";
import RecipeDetailContent from "./recipeDetail/RecipeDetailContent";
import RelatedVideo from "./recipeDetail/RelatedVideo";
import IngredientsList from "./recipeDetail/IngredientsList";
import tw from "tailwind-styled-components";
import RecipeDetailHeader from "./recipeDetail/RecipeDetailHeader";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  return (
    <div>
      {recipeId}
      <PageHeader> 삭제 수정 버튼이 들어가야함 </PageHeader>
      <MainImg />
      <RecipeDetailHeader />
      <IngredientsList />
      <RelatedVideo videoUrl="ㅎㅎ" />
      <RecipeDetailContent content="이거이거 ㅎ" />
      <CommentBox />
    </div>
  );
};

export default RecipeDetail;

const MainImg = tw.img`
`;

const PageHeader = tw.div`
`;
