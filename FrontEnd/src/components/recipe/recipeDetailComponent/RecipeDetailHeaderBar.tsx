import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const RecipeDetailHeaderBar = ({ recipeId, myRecipe }: { recipeId: number; myRecipe: boolean }) => {
  const navigate = useNavigate();

  const backBtn = () => {
    navigate("/recipe");
  };

  const manageBtn = () => {
    console.log("gg");
    console.log(recipeId);
  };

  return (
    <SearchBar>
      <BackBtn src="/img/btn/left-btn.png" onClick={backBtn} />
      <DetailManageBtnBox>
        {myRecipe && <DetailManageBtn src="/img/btn/menu-btn.png" onClick={manageBtn} />}
      </DetailManageBtnBox>
    </SearchBar>
  );
};

export default RecipeDetailHeaderBar;

const SearchBar = tw.div`
mx-auto
w-full
h-[55px]
flex
bg-white
`;

const BackBtn = tw.img`
ml-5
mr-3 
my-auto
w-[.75rem]
h-5 
`;

const DetailManageBtnBox = tw.div`
flex
flex-row-reverse
w-[calc(100%-0.75rem)]
h-auto
items-center
`;

const DetailManageBtn = tw.img`
w-[2.25rem]
mr-[1.25rem]
`;
