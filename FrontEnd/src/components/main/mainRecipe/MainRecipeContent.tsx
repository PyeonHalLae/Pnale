import { RecipeInfo } from "@/model/commonType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const MainRecipeContent = ({ recipe }: { recipe: RecipeInfo }) => {
  const navigate = useNavigate();
  const [recipeId, setRecipeId] = useState<number>();
  const [ingrediendtsToShow, setIngrediendtsToShow] = useState<string[]>();

  useEffect(() => {
    console.log(recipe.rcpName);
    console.log(recipe);

    if (recipe.ingredients) {
      setRecipeId(recipe.rcpId);
      setIngrediendtsToShow(recipe.ingredients.slice(0, 2));
    }
  }, [recipe]);

  return (
    <div className="bg-white border-2 border-white">
      <div
        className="m-3 border-2 shadow-xl border-common-white-divider"
        onClick={() => navigate(`/recipe/${recipeId}`)}
      >
        <img src={recipe.rcpThumbnail} alt="레시피 사진" className="h-[210px] w-full"></img>
        {ingrediendtsToShow && (
          <TextBox>
            <div className="text-common-text-color">
              <Title>
                {recipe.rcpName} {recipe.rcpSimple}
              </Title>
              {ingrediendtsToShow.map((ingredient, index) => (
                <Tag key={index}># {ingredient.slice(ingredient.indexOf(")") + 1)}</Tag>
              ))}
            </div>
            <UserArea>
              <Profile src={recipe.member.memberImg} alt="프로필사진" />
              <div className="font-[G-sans-light] text-sm">{recipe.member.nickname}</div>
            </UserArea>
          </TextBox>
        )}
      </div>
    </div>
  );
};

export default MainRecipeContent;

const TextBox = tw.div`
mx-5
my-1
flex
`;

const Title = tw.div`

text-2xl
`;

const Tag = tw.span`
font-[G-sans-light]
text-lg
block
`;
const Profile = tw.img`
w-8
h-8
mx-auto
rounded-full
`;

const UserArea = tw.div`
m-auto 
relative
bottom-[-20px]
left-[20px]
`;
