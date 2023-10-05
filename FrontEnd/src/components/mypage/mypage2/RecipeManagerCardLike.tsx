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
  $selectRecipeId: number;
  LikeMenuStateHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  UpdateRecipeList: () => void;
}

const RecipeManagerCardLike = ({
  $selectRecipeId,
  LikeMenuStateHandler,
  UpdateRecipeList,
}: Props) => {
  const navigate = useNavigate();
  //좋아요 해제 로직
  const likeBtnHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    LikeMenuStateHandler(e);
    axios
      .patch("/api/recipe/like?rcpId=" + $selectRecipeId, {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          UpdateRecipeList();
          ToastBackMessage("레시피 좋아요를 해제했습니다");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .patch(`/api/auth/recipe/like?rcpId=${$selectRecipeId}`, {
              withCredentials: true,
            })
            .then((res) => {
              const resData = res.data;
              if (resData.code == 200) {
                UpdateRecipeList();
                ToastBackMessage("레시피 좋아요를 해제했습니다");
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                UserInfoExpires();
                navigate("/mypage");
              } else {
                ToastErrorMessage("좋아요 해제를 실패했습니다");
              }
            });
        } else {
          if (err.response.status === 403) {
            UserNotLogin();
            navigate("/mypage");
          } else {
            ToastErrorMessage("좋아요 해제를 실패했습니다");
          }
        }
      });
  };

  return (
    <>
      <BackSize onClick={LikeMenuStateHandler}>
        <LikeBox
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          <LikeTitle>레시피 좋아요 관리</LikeTitle>
          <LikeText>
            <div>
              레시피 좋아요를 <span>해제</span> 하시겠습니까?
            </div>
          </LikeText>
          <LikeBtn>
            <CloseBtn onClick={LikeMenuStateHandler}>닫기</CloseBtn>
            <DelteBtn onClick={likeBtnHandler}>좋아요 해제</DelteBtn>
          </LikeBtn>
        </LikeBox>
      </BackSize>
    </>
  );
};

export default RecipeManagerCardLike;

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

const LikeBox = tw.div`
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

const LikeTitle = tw.div`
  w-[full]
  text-center
  h-[65px]
  font-bold
  text-[25px]
  leading-[95px]
  text-common-text-color
`;

const LikeText = styled.div`
  margin: 25px 0px;
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

const LikeBtn = tw.div`
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
