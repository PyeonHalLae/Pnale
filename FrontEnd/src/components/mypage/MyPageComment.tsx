// import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import CommentCard from "@/components/mypage/mypage2/CommentCard";
import { useState } from "react";
import { useEffect } from "react";
import { ToastErrorMessage, UserInfoExpires, UserNotLogin } from "@/model/toastMessageJHM";
import axios from "axios";

interface commentInfoType {
  rcpId: number;
  rcpName: string;
  revId: number;
  content: string;
  createdAt: string;
}

const MyPageComment = () => {
  const [CommentList, setCommentList] = useState<commentInfoType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .patch("/api/mypage/comment?page=0", {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          setCommentList(resData.data.content);
        }
        if (resData.code == 204) {
          setCommentList(null);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          //리프레시 토큰 재발급
          axios
            .patch("/api/auth/mypage/comment?page=0", {
              withCredentials: true,
            })
            .then((res) => {
              //재발급이 잘되서 정보를 받아온경우
              const resData = res.data;
              if (resData.code == 200) {
                setCommentList(resData.data.content);
              }
              if (resData.code == 204) {
                setCommentList(null);
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                //제발급 실패! 재로그인 해주세요!!
                UserInfoExpires();
                navigate("/mypage");
              } else {
                ToastErrorMessage("댓글 정보를 불러오는데 실패했습니다");
              }
            });
        } else {
          if (err.response.status === 403) {
            //처음부터 토큰이 없는경우 ! 로그인화면 보여준다
            UserNotLogin();
            navigate("/mypage");
          } else {
            //그외 서버 오류
            ToastErrorMessage("댓글 정보를 불러오는데 실패했습니다");
          }
        }
      });
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
        {CommentList &&
          CommentList.map((commentItme, index) => (
            <CommentCard key={commentItme.revId + index} commentInfo={commentItme} />
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
