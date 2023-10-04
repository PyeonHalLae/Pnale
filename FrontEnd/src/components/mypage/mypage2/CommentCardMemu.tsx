import {
  ToastBackMessage,
  ToastErrorMessage,
  UserInfoExpires,
  UserNotLogin,
} from "@/model/toastMessageJHM";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface Props {
  $selectCommentId: number;
  BottomMenuStateHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  UpdateCommentList: () => void;
}

const CommentCardMemu = ({
  $selectCommentId,
  BottomMenuStateHandler,
  UpdateCommentList,
}: Props) => {
  const navigate = useNavigate();

  // 삭제하기 클릭
  const deleteBtnHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log($selectCommentId);
    BottomMenuStateHandler(e);
    axios
      .delete("/api/recipe/review?revId=" + $selectCommentId, {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          UpdateCommentList();
          ToastBackMessage(resData.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .delete("/api/auth/recipe/review?revId=" + $selectCommentId, {
              withCredentials: true,
            })
            .then((res) => {
              const resData = res.data;
              if (resData.code == 200) {
                UpdateCommentList();
                ToastBackMessage(resData.message);
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                UserInfoExpires();
                navigate("/mypage");
              } else {
                ToastErrorMessage("댓글 삭제에 실패했습니다");
              }
            });
        } else {
          if (err.response.status === 403) {
            UserNotLogin();
            navigate("/mypage");
          } else {
            ToastErrorMessage("댓글 삭제에 실패했습니다");
          }
        }
      });
  };

  return (
    <>
      <BackSize onClick={BottomMenuStateHandler}>
        <CommentBox
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          <CommentTitle>댓글 관리</CommentTitle>
          <CommentText>
            <div>
              댓글을 <span>삭제</span> 하시겠습니까?
            </div>
            <div>삭제후 복구 하실수 없습니다</div>
          </CommentText>
          <CommentBtn>
            <CloseBtn onClick={BottomMenuStateHandler}>닫기</CloseBtn>
            <DelteBtn onClick={deleteBtnHandler}>삭제하기</DelteBtn>
          </CommentBtn>
        </CommentBox>
      </BackSize>
    </>
  );
};

export default CommentCardMemu;

const BackSize = tw.div`
    fixed
    bg-[rgba(51,51,51,0.8)]
    min-w-[350xp]
    max-w-[450px]
    w-full
    h-full
    top-0
    z-40
`;

const CommentBox = tw.div`
    absolute
    bg-white
    w-[90%]
    h-[200px]
    left-[5%]
    top-[35%]
    rounded-[5px_5px_5px_5px]
    z-50
`;

const DelteBtn = tw.div`
  w-40
  h-10
  border-[2px]
  rounded-[8px]
  bg-common-text-color
  border-common-text-color
  text-white
  text-center
  font-bold
  text-[17px]
  leading-[40px]  

`;

const CommentTitle = tw.div`
  w-[full]
  text-center

  h-[60px]
  font-bold
  text-[25px]
  leading-[80px]
  text-common-text-color
`;

const CommentText = styled.div`
  margin: 15px 0px;
  width: 100%;
  color: #1e2b4f;
  font-size: 17px;
  div {
    text-align: center;
    span {
      font-weight: bold;
      color: #e30613;
    }
  }
`;

const CommentBtn = tw.div`
  flex justify-center gap-5
`;

const CloseBtn = tw.div`
  w-24
  h-10
  border-[2px]
  rounded-[8px]
  border-common-text-color
  text-common-text-color
  text-center
  font-bold
  text-[17px]
  leading-[40px]
`;
