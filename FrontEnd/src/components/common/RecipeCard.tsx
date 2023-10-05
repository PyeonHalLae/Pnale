// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { recipeType } from "@/model/commonType";
import { useState, useRef, useEffect } from "react";
import BottomMenu from "./BottomMenu";

const RecipeCard = ({ recipeInfo }: { recipeInfo: recipeType }) => {
  const [bottomMenuState, setBottomMenuState] = useState<boolean>(false);
  const navigate = useNavigate();
  const [titleStyleState, setTitleStyleState] = useState<boolean>(false);
  const titleRef = useRef(null);
  //높이 설정

  useEffect(() => {
    const titleStyle = window.getComputedStyle(titleRef.current);
    const titleHeight = parseFloat(titleStyle.height);
    //한줄이라면
    if (titleHeight < 40) {
      setTitleStyleState(true);
    } else {
      setTitleStyleState(false);
    }
  }, []);
  // 카드 눌렀을 시 레시피 디테일로 이동
  const navigateHandler = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  const BottomMenuStateHandler = () => {
    setBottomMenuState(!bottomMenuState);
  };

  const manageBtnHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    BottomMenuStateHandler();
  };

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
          <div className="inline h-[100%] py-1">{recipeInfo.viewCnt}</div>
        </ViewCountBox>
        {/* 
        {recipeInfo.myRecipe && (
          <div
            className="absolute
          top-0
          right-2
          w-[3rem]"
            onClick={manageBtnHandler}
          >
            <ManageBtn src="/img/btn/menu-btn.png" />
          </div>
        )} */}

        {/* 레시피 제목 */}
        <RecipeTitleBox
          ref={titleRef}
          className={titleStyleState && "mt-[0.9375rem] mb-[0.3125rem]"}
        >
          {recipeInfo.rcpName}
        </RecipeTitleBox>

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
        <div className="relative text-[0.6rem] bottom-70  text-common-text-gray-color mt-[0.2rem]">
          {recipeInfo.createdAt.substring(0, 10)} {recipeInfo.createdAt.substring(11, 16)}
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

      {bottomMenuState && (
        <BottomMenu
          $selectRecipeId={recipeInfo.rcpId}
          BottomMenuStateHandler={manageBtnHandler}
        ></BottomMenu>
      )}
    </Container>
  );
};

export default RecipeCard;

const Container = tw.div`
  relative min-w-[22.5rem] max-w-[28.125rem] min-h-[7.8125rem] bg-white grid grid-cols-5 my-[.625rem] items-center ;
`;

const RecipeImg = tw.img`
  w-[7.5rem] h-[6.42rem] rounded-[.3125rem] m-auto col-span-2 object-cover bg-common-back-color p-1
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

// const ManageBtn = tw.img`
// absolute
// top-0
// right-2
// w-[1rem]
// inline-block
// `;

const RecipeTitleBox = styled.div`
  color: #1e2b4f;
  font-size: 1rem;
  width: 13.75rem;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const InfluencerBox = tw.img`
 absolute top-0 right-0 w-[4.4rem] h-[1.16rem]
`;

const LikeCommentBox = tw.div`
  absolute bottom-[0.25rem] right-[0.25rem] text-[0.6rem] text-common-text-gray-color
`;

const ViewIcon = tw.img`
  w-[0.7rem] h-[0.7rem] inline-block mr-[0.3rem] ml-[0.1rem]
`;

const LikeCommentIcon = tw(ViewIcon)`
  ml-[0.3rem]
`;
