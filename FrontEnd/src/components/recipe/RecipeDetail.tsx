import CommentBox from "./RecipeDetail/CommentBox";
import { useParams } from "react-router-dom";
import RecipeDetailContent from "./RecipeDetail/RecipeDetailContent";
import RelatedVideo from "./RecipeDetail/RelatedVideo";
import IngredientsList from "./RecipeDetail/IngredientsList";
import tw from "tailwind-styled-components";
import RecipeDetailHeader from "./RecipeDetail/RecipeDetailHeader";

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
