import { recipeType } from "@/model/commonType";
import RecipeCard from "@components/common/RecipeCard";
import { useNavigate } from "react-router-dom";

const RecipeArea = ({ recipe }: { recipe: recipeType[] }) => {
  const navigate = useNavigate();

  // const [popularRecipeList, setPopularRecipeList] = useState<RecipeInfo[]>([]);
  // const [recipeList, setRecipeList] = useState<RecipeInfo[]>([]);

  console.log("recipe", recipe);

  return (
    <div className="bg-white">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-orange">관련</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 레시피</span>
        </div>
        <button
          className="absolute right-0 inline-block pr-5 font-bold bottom-4 text-common-orange"
          onClick={() => navigate("/search-recipe")}
        >
          더보기
        </button>
      </div>
      <div>
        {recipe.map((recipeItem) => (
          <RecipeCard
            recipeInfo={recipeItem}
            key={recipeItem.rcpId + "-" + recipeItem.member.memberId}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeArea;
