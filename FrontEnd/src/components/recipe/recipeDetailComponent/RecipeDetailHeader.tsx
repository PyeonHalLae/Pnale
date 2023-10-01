import tw from "tailwind-styled-components";
import styled from "styled-components";
import { recipeDetailType } from "./recipeDetailType";
import { customAxios } from "@/api/customAxios";

const RecipeDetailHeader = ({ recipeInfo }: { recipeInfo: recipeDetailType }) => {
  const recipeLikeHanlder = () => {
    customAxios
      .patch("", null, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <RecipeDetailHeaderImg $mainImgUrl={recipeInfo.rcpThumbnail}>
        {recipeInfo.like ? (
          <img
            className="absolute right-[1.25rem] bottom-[0.56rem] w-[3.125rem] h-[3.125rem]"
            src="/img/btn/like-btn-pink.png"
            alt="좋아요 버튼"
            onClick={recipeLikeHanlder}
          />
        ) : (
          <img
            className="absolute right-[1.25rem] bottom-[0.56rem] w-[3.125rem] h-[3.125rem]"
            src="/img/btn/like-btn-gray.png"
            alt="좋아요 버튼 - 회색"
            onClick={recipeLikeHanlder}
          />
        )}
      </RecipeDetailHeaderImg>

      <RecipeDetailHeaderContent>
        {/* 레시피 제목 */}

        <HeaderTitleBox>{recipeInfo.rcpName}</HeaderTitleBox>

        <HeaderSecondBox>
          <div className="absolute h-[1rem] left-0 w-auto">{recipeInfo.createdAt}</div>
          <div className="absolute flex h-[1rem] right-0 items-center">
            <div>{recipeInfo.member.nickname}</div>

            <img
              className="w-[2.5rem] h-[2.5rem] rounded-[2.5rem] ml-[0.5rem]"
              src={recipeInfo.member.memberImg}
              alt="유저사진"
            />
          </div>
        </HeaderSecondBox>

        <RecipeIntroBox>{recipeInfo.rcpSimple}</RecipeIntroBox>

        <hr />

        <RecipeReactionBox>
          <IconBoxFirst>
            <Icons src="/img/icons/view-icon-pink.png" alt="조회수아이콘" />
            <div className="h-[0.75rem] ">조회수 {recipeInfo.viewCnt}회</div>
          </IconBoxFirst>

          <IconBoxSecond>
            <Icons src="/img/icons/like-icon-pink.png" alt="좋아요아이콘" />
            <div className="h-[0.75rem]">좋아요 {recipeInfo.likeCnt}개</div>
          </IconBoxSecond>

          <IconBoxThird>
            <Icons src="/img/icons/comment-icon-pink.png" alt="댓글아이콘" />
            <div className="h-[0.75rem]">댓글 {recipeInfo.replyCnt}개</div>
          </IconBoxThird>
        </RecipeReactionBox>
      </RecipeDetailHeaderContent>
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
text-common-text-gray-color
text-[0.75rem]
min-w-[22.5rem] 
max-w-[28.125rem] 
px-[1.875rem] 
pt-[1.375rem] 
pb-[1rem] 
bg-white mb-[.375rem] 
`;

const HeaderTitleBox = tw.div`
w-full
text-common-text-color
text-[24px]
font-semibold
mb-[0.6rem]
`;
const HeaderSecondBox = tw.div`
relative
flex
h-[2.5rem]
`;
const RecipeIntroBox = tw.div`
min-h-[2rem]
mb-[0.2rem]
`;
const RecipeReactionBox = tw.div`
relative
flex
h-[1rem]
items-center
my-[0.5rem]
`;
const IconBox = tw.div`
absolute
flex
h-[1rem]
items-center
justify-center
`;
const IconBoxFirst = tw(IconBox)`
left-[1rem]
`;

const IconBoxSecond = tw(IconBox)`
left-[39%]
`;

const IconBoxThird = tw(IconBox)`
right-[2.1875rem]
`;

const Icons = tw.img`
inline-block
w-[0.8rem]
h-[0.8rem]
mr-1
`;
