import PopularRecipeCard from "./PopularRecipeCard";

interface recipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
  recipeId: number;
}

const PopularRecipeRoller = ({ popularRecipeList }: { popularRecipeList: recipeType[] }) => {
  return (
    <div>
      {/* 여기는 인기레시피 카드 리스트 */}
      {popularRecipeList &&
        popularRecipeList.map((popularRecipeItem, index) => (
          <PopularRecipeCard
            key={popularRecipeItem.recipeTitle + index}
            recipeInfo={popularRecipeItem}
          />
        ))}
    </div>
  );
};

export default PopularRecipeRoller;
