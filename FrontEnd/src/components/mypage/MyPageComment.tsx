// import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import CommentCard from "@/components/mypage/mypage2/CommentCard";
import { useState } from "react";
import { useEffect } from "react";

interface commentType {
  commentTitle: string;
  commentDetail: string;
  commentDate: string;
  commentId: number;
}

const MyPageComment = () => {
  const [CommentList, setCommentList] = useState<commentType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCommentList([
      {
        commentTitle: "인생 짜빠구리 만드는 방법 입니다 그렇게...",
        commentDetail:
          "너무 맛있게 잘먹었습니다! 좋아요 누를게요!! ㄴㅁ이라ㅓㄴ러ㅏㅣㄴㅁ어리ㅏㅓㅣㅏㅁㄴ어라ㅣ;ㅁㄴ어리ㅏㅁ",
        commentDate: "2021.11.12",
        commentId: 1,
      },
      {
        commentTitle: "인생 짜빠구리 만드는 방법 입니다 그렇게...",
        commentDetail:
          "너무 맛있게 잘먹었습니다! 좋아요 누를게요!! ㄴㅁ이라ㅓㄴ러ㅏㅣㄴㅁ어리ㅏㅓㅣㅏㅁㄴ어라ㅣ;ㅁㄴ어리ㅏㅁ",
        commentDate: "2021.11.12",
        commentId: 2,
      },
      {
        commentTitle: "인생 짜빠구리 만드는 방법 입니다 그렇게...",
        commentDetail:
          "너무 맛있게 잘먹었습니다! 좋아요 누를게요!! ㄴㅁ이라ㅓㄴ러ㅏㅣㄴㅁ어리ㅏㅓㅣㅏㅁㄴ어라ㅣ;ㅁㄴ어리ㅏㅁ",
        commentDate: "2021.11.12",
        commentId: 3,
      },
    ]);
  }, []);

  return (
    <>
      <MyCommentHeader>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title>댓글 관리</Title>
        <SideBtn>
          <MyCommentBtn>내 댓글</MyCommentBtn>
        </SideBtn>
      </MyCommentHeader>
      <MyCommentMain>
        {/* {CommentList.map((commentItem, index) => (
          <CommentCard
          // key={recipeItem.recipeTitle + index}
          // recipeInfo={recipeItem}
          // myRecipeType={recipeType}
          />
        ))} */}
        {CommentList.map((commentItme, index) => (
          <CommentCard key={commentItme.commentId + index} />
        ))}
      </MyCommentMain>
    </>
  );
};

export default MyPageComment;

const MyCommentHeader = tw.div`
  h-[9.375rem] bg-white
`;

const BackBtn = styled.div`
  float: left;
  width: 0.6875rem;
  height: 1.3125rem;
  margin-left: 1.25rem;
  margin-top: 1.875rem;
  background-image: url("/img/btn/left-btn.png");
  background-size: 0.6875rem 1.3125rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = tw.div`
  pt-[4.375rem] pl-[0.9375rem]
  text-[1.5625rem]
  h-[1.875rem]
  text-common-text-color
`;

const SideBtn = tw.div`
  flex
  mt-[3.125rem]
  text-[1rem]
  text-common-text-color
  ml-[0.3125rem]
`;

const MyCommentBtn = tw.div`
  ml-[0.625rem]
  h-[2.0125rem]  
  border-common-text-color
  border-b-4
  w-16
  text-center
  `;

const MyCommentMain = tw.div`
  overflow-scroll
  h-[calc(100%-9.375rem)]

`;
