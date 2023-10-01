// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { recipeType } from "@/model/commonType";

const RecipeCard = ({ recipeInfo }: { recipeInfo: recipeType }) => {
  // const [isAdmin, setIsAdmin] = useState<boolean>();
  // useEffect(() => {
  //   setIsAdmin(false);
  // }, []);
  const navigate = useNavigate();

  // 카드 눌렀을 시 레시피 디테일로 이동
  const navigateHandler = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  // recipeInfo = {
  //   rcpName:
  //     "두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다",
  //   rcpThumbnail: "/img/test/너굴맨레시피.jpg",
  //   member: {
  //     nickname: "정현모",
  //     memberId: 1,
  //     memberImg: "/img/test/너굴맨레시피.jpg",
  //   },
  //   viewCnt: 1000,
  //   likeCnt: 1000,
  //   replyCnt: 1000,
  //   createdAt: "2020.20.20",
  //   rcpId: 1,
  //   influence: true,
  //   like: true,
  // };
  return (
    <Container
      onClick={() => {
        navigateHandler(recipeInfo.rcpId);
      }}
    >
      {/* 레시피 이미지 */}
      <RecipeImg src={recipeInfo.rcpThumbnail} alt="레시피이미지" />

      {/* 이미지 외의 영역 */}
      <ContentBox>
        {/* 조회수박스 */}
        <ViewCountBox>
          <ViewIcon src="/img/icons/view-icon-gray.png" alt="조회" />
          {recipeInfo.viewCnt}
        </ViewCountBox>

        {recipeInfo.myRecipe && <ManageBtn src="/img/btn/menu-btn.png" />}

        {/* 레시피 제목 */}
        <RecipeTitleBox>{recipeInfo.rcpName}</RecipeTitleBox>

        {/* 유저 닉네임, 유저 이미지 */}
        <div className="text-[0.8rem] text-common-text-gray-color justify-center align-top text-aling">
          by {recipeInfo.member.nickname}
          <img
            className="w-[1.5rem] h-[1.5rem] rounded-[0.8rem] ml-2 inline-block"
            src={recipeInfo.member.memberImg}
            alt="유저이미지"
          />
        </div>

        {/* 작성일 */}
        <div className="relative text-[0.6rem] bottom-70  text-common-text-gray-color">
          {recipeInfo.createdAt}
        </div>
      </ContentBox>

      {/* 관리자 게시물일경우만 우상단 인플루언서 태그*/}
      {recipeInfo.influence && <InfluencerBox src="/img/sticker/recipe/inf.png" />}

      {/* 좋아요 댓글 우하단 박스 */}
      <LikeCommentBox>
        <LikeCommentIcon src="/img/icons/like-icon-pink.png" alt="좋아요" />
        {recipeInfo.likeCnt}
        <LikeCommentIcon src="/img/icons/comment-icon-pink.png" alt="댓글" />
        {recipeInfo.replyCnt}
      </LikeCommentBox>
    </Container>
  );
};

export default RecipeCard;

const Container = tw.div`
  relative min-w-[22.5rem] max-w-[28.125rem] min-h-[7.8125rem] bg-white grid grid-cols-5 my-[.625rem] items-center;
`;

const RecipeImg = tw.img`
  w-[7.5rem] h-[6.42rem] rounded-[.3125rem] m-auto col-span-2
`;

const ContentBox = tw.div`
  relative 
  h-[6.25rem] 
  col-span-3 
  my-[0.5rem]
`;

const ViewCountBox = tw.div`
text-[0.6rem]  
text-common-text-gray-color
`;

const ManageBtn = tw.img`
absolute
top-0
right-2
w-[1rem]
inline-block
`;

const RecipeTitleBox = styled.div`
  font-size: 1.1rem;
  overflow: clip;
  display: -webkit-box; // webkit-box
  -webkit-line-clamp: 2; // 2줄까지
  -webkit-box-orient: vertical; //...
`;

const InfluencerBox = tw.img`
 absolute top-0 right-0 w-[4.4rem] h-[1.16rem]
`;

const LikeCommentBox = tw.div`
  absolute bottom-[0.25rem] right-[0.25rem] text-[0.6rem] text-common-text-gray-color
`;

const ViewIcon = tw.img`
  w-[0.75rem] h-[0.75rem] inline-block mr-[0.3rem]
`;

const LikeCommentIcon = tw(ViewIcon)`
  ml-[0.3rem]
`;
