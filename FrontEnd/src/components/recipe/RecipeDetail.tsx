import CommentBox from "./recipeDetailComponent/CommentBox";
import { useParams } from "react-router-dom";
import RecipeDetailContent from "./recipeDetailComponent/RecipeDetailContent";
import RelatedVideo from "./recipeDetailComponent/RelatedVideo";
import IngredientsList from "./recipeDetailComponent/IngredientsList";
import tw from "tailwind-styled-components";
import RecipeDetailHeader from "./recipeDetailComponent/RecipeDetailHeader";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  return (
    <div>
      {recipeId}
      <PageHeader> 삭제 수정 버튼이 들어가야함 </PageHeader>
      <MainImg />
      <RecipeDetailHeader mainImgUrl={"/img/test/너굴맨레시피.jpg"} />
      <IngredientsList />
      <RelatedVideo videoUrl="https://www.youtube.com/watch?v=oCduiXGcWdw" />
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
