// import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import CommentCard from "@/components/mypage/mypage2/CommentCard";
import { useState } from "react";
import { useEffect } from "react";
import { ToastErrorMessage, UserInfoExpires, UserNotLogin } from "@/model/toastMessageJHM";
import axios from "axios";
import CommentCardMenu from "./mypage2/CommentCardMenu";

interface commentInfoType {
  rcpId: number;
  rcpName: string;
  revId: number;
  content: string;
  createdAt: string;
}

const MyPageComment = () => {
  const [commentList, setCommentList] = useState<commentInfoType[]>([]);
  const navigate = useNavigate();
  //하단 메뉴 상태
  const [bottomMenuState, setBottomMenuState] = useState<boolean>();
  const [selectCommentId, setSelectCommentId] = useState<number>();

  //페이지를 위한 state
  const [totalPage, setTotalPage] = useState<number>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  //하단 메뉴 출력 State 변경
  const BottomMenuStateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setBottomMenuState(!bottomMenuState);
  };

  //하단 메뉴 댓글 아이디 변경
  const SelectCommentIdHandler = (revId: number) => {
    setSelectCommentId(revId);
  };

  //댓글 삭제시 List에서 제거
  const UpdateCommentList = (commentId: number) => {
    const updatedCommentList = commentList.filter((comment) => comment.revId !== commentId);
    console.log(updatedCommentList);
    setCommentList([...updatedCommentList]);
  };

  const AxiosHandler = () => {
    axios
      .get("/api/mypage/comment?page=" + currentPage, {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          setCommentList([...commentList, ...resData.data.content]);
          setCurrentPage((prev) => prev + 1);
          setTotalPage(res.data.data.totalPages);
        }
        if (resData.code == 204) {
          setCommentList(null);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          //리프레시 토큰 재발급
          axios
            .get("/api/auth/mypage/comment?page=" + currentPage, {
              withCredentials: true,
            })
            .then((res) => {
              //재발급이 잘되서 정보를 받아온경우
              const resData = res.data;
              if (resData.code == 200) {
                setCommentList([...commentList, ...resData.data.content]);
                setCurrentPage((prev) => prev + 1);
                setTotalPage(res.data.data.totalPages);
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
  };

  useEffect(() => {
    AxiosHandler();
  }, []);

  return (
    <>
      <div className="relative">
        {bottomMenuState && (
          <CommentCardMenu
            $selectCommentId={selectCommentId}
            BottomMenuStateHandler={BottomMenuStateHandler}
            UpdateCommentList={UpdateCommentList}
          />
        )}
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
          {commentList &&
            commentList.map((commentItme) => (
              <CommentCard
                key={commentItme.revId}
                commentInfo={commentItme}
                BottomMenuStateHandler={BottomMenuStateHandler}
                SelectCommentIdHandler={SelectCommentIdHandler}
              />
            ))}

          <CommentAddBox>
            {totalPage > 1 && currentPage < totalPage && (
              <AddBtn
                onClick={() => {
                  AxiosHandler();
                }}
              >
                더보기 +
              </AddBtn>
            )}
          </CommentAddBox>
        </MyCommentMain>
      </div>
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

const CommentAddBox = tw.div`
  flex h-24
`;

const AddBtn = tw.div`mx-auto my-auto text-common-text-color text-[20px]`;
