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
        <img src={recipe.rcpThumbnail} alt="레시피 사진" className="h-[13.125rem] w-full"></img>
        {ingrediendtsToShow && (
          <TextBox>
            <div className="text-common-text-color my-auto w-[calc(100%-4.0625rem)]">
              <Title>{recipe.rcpName}</Title>
              <TagBox>
                {ingrediendtsToShow.map((ingredient, index) => (
                  <Tag key={index}># {ingredient.slice(ingredient.indexOf(")") + 1)}</Tag>
                ))}
              </TagBox>
            </div>
            <UserArea>
              <Profile src={recipe.member.memberImg} alt="프로필사진" />
              <div className="font-[G-sans-light] text-sm mt-2">{recipe.member.nickname}</div>
            </UserArea>
          </TextBox>
        )}
      </div>
    </div>
  );
};

export default MainRecipeContent;

const TextBox = tw.div`
mx-[0.375rem]
my-2
flex
justify-between
`;

const Title = tw.div`
text-2xl
line-clamp-2

`;

const Tag = tw.span`
font-[G-sans-light]
text-base
block
break-words
`;

const Profile = tw.img`
w-12
h-12
mx-auto
rounded-full
shadow-[0px_0px_2px_rgba(0,0,0,0.2)]
`;

const UserArea = tw.div`
w-[3.75rem]
overflow-hidden
my-auto
text-center
`;

const TagBox = tw.div`
py-1
`;
