import tw from "tailwind-styled-components";
import styled from "styled-components";

const RecipeDetailHeader = ({ mainImgUrl }: { mainImgUrl: string }) => {
  console.log(mainImgUrl);
  console.log(typeof mainImgUrl);
  return (
    <div>
      <RecipeDetailHeaderImg $mainImgUrl={mainImgUrl}>
        <img
          className="absolute right-[1.25rem] bottom-[0.56rem] w-[3.125rem] h-[3.125rem]"
          src="/img/btn/like-btn-pink.png"
          alt="좋아요 버튼"
        />
      </RecipeDetailHeaderImg>
      <RecipeDetailHeaderContent />
    </div>
  );
};

export default RecipeDetailHeader;

const RecipeDetailHeaderImg = styled.div<{ $mainImgUrl: string }>`
  position: relative;
  min-width: 22.5rem;
  min-height: 17.5rem;
  background-image: url(${(props) => props.$mainImgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const RecipeDetailHeaderContent = tw.div`
`;
