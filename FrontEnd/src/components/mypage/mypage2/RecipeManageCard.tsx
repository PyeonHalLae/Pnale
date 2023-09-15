// import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface recipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
}

const RecipeManageCard = ({
  recipeInfo,
  myRecipeType,
}: {
  recipeInfo: recipeType;
  myRecipeType: string;
}) => {
  // const [isAdmin, setIsAdmin] = useState<boolean>();
  // useEffect(() => {
  //   setIsAdmin(false);
  // }, []);

  recipeInfo = {
    recipeTitle: "두줄제목입니다입니다asdasdasd입sdas니asdfasdf다safdsdaasdfsdfsdf입니다",
    recipeImg: "/img/test/너굴맨레시피.jpg",
    viewCnt: 1000,
    likeCnt: 1000,
    commentCnt: 1000,
    userName: "운영자",
    userImg: "/img/test/너굴맨레시피.jpg",
    createdDate: "2020.20.20",
  };
  return (
    <Container>
      {/* 레시피 이미지 */}
      <RecipeImg src={recipeInfo.recipeImg} alt="레시피이미지" />

      {/* 이미지 외의 영역 */}
      <ContentBox>
        {/* 관리 버튼 */}
        {myRecipeType === "MYRECIPE" ? (
          <MenuBtn $imgurl={"/img/btn/menu-btn.png"} />
        ) : (
          <MenuBtn $imgurl={"/img/btn/close-btn.png"} />
        )}
        {/* 조회수박스 */}
        <ViewCountBox>
          <ViewIcon src="/img/icons/view-icon-gray.png" alt="조회" />
          {recipeInfo.viewCnt}
        </ViewCountBox>

        {/* 레시피 제목 */}
        <Title>{recipeInfo.recipeTitle}</Title>

        {/* 유저 닉네임, 유저 이미지 */}
        {recipeInfo.userName === "운영자" ? (
          <div className="inline-block text-[0.8rem] text-white bg-common-peach justify-center px-1 my-auto h-[1rem]">
            인플루언서
          </div>
        ) : (
          <div className="text-[0.8rem] text-common-text-gray-color justify-center align-top">
            by {recipeInfo.userName}
            <img
              className="w-[1.5rem] h-[1.5rem] rounded-[0.8rem] ml-2 inline-block"
              src={recipeInfo.userImg}
              alt="유저이미지"
            />
          </div>
        )}
        {/* 작성일 */}
        <div className="relative text-[0.6rem] bottom-70  text-common-text-gray-color">
          {recipeInfo.createdDate}
        </div>
      </ContentBox>

      {/* 좋아요 댓글 우하단 박스 */}
      <LikeCommentBox>
        <LikeCommentIcon src="/img/icons/like-icon-pink.png" alt="좋아요" />
        {recipeInfo.likeCnt}
        <LikeCommentIcon src="/img/icons/comment-icon-pink.png" alt="댓글" />
        {recipeInfo.commentCnt}
      </LikeCommentBox>
    </Container>
  );
};

export default RecipeManageCard;

const Container = tw.div`
 relative 
 min-w-[22.5rem] 
 max-w-[28.125rem] 
 min-h-[7.5rem]
bg-white 
grid grid-cols-5 
my-[.625rem] 
items-center;
`;

const RecipeImg = tw.img`
 max-w-[8.75rem] 
 max-h-[7.5rem] 
 w-[8rem] 
 h-[6.25rem] 
 rounded-[.3125rem] 
 m-auto 
 col-span-2
`;

const ContentBox = tw.div`
  h-[6.25rem] 
  col-span-3 
  my-[0.5rem]
`;

const ViewCountBox = tw.div`
relative 
top-0 text-[0.6rem]  
text-common-text-gray-color
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

const Title = styled.div`
  font-size: 1rem;
  width: 220px;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MenuBtn = styled.div<{ $imgurl: string }>`
  float: right;
  margin-right: 10px;
  margin-top: -2px;
  width: 15px;
  height: 15px;
  background-image: url(${(props) => props.$imgurl});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
