// import styled from "styled-components";
import {
  ToastBackMessage,
  ToastErrorMessage,
  UserInfoExpires,
  UserNotLogin,
} from "@/model/toastMessageJHM";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface Props {
  $selectRecipeId: number;
  BottomMenuStateHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  UpdateRecipeList: () => void;
}

const RecipeManageCardMenu = ({
  $selectRecipeId,
  BottomMenuStateHandler,
  UpdateRecipeList,
}: Props) => {
  //상태관리
  const navigate = useNavigate();
  const [menuState, setMenuState] = useState<boolean>(true);
  const [deleteState, setdeleteState] = useState<boolean>(false);

  // 메뉴-수정하기 클릭
  const modifyMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    BottomMenuStateHandler(e);
    navigate(`/recipe/${$selectRecipeId}/modify`);
  };

  // //메뉴-삭제하기 클릭
  const deleteMenuHandler = () => {
    setMenuState(false);
    setdeleteState(true);
  };

  // 삭제하기 클릭
  const deleteBtnHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    BottomMenuStateHandler(e);

    axios
      .delete(`/api/recipe/form?rcpId=${$selectRecipeId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          UpdateRecipeList();
          ToastBackMessage("레시피가 삭제하였습니다");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .delete(`/api/auth/recipe/form?rcpId=${$selectRecipeId}`, {
              withCredentials: true,
            })
            .then((res) => {
              const resData = res.data;
              if (resData.code == 200) {
                UpdateRecipeList();
                ToastBackMessage("레시피를 삭제하였습니다");
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                UserInfoExpires();
                navigate("/mypage");
              } else {
                ToastErrorMessage("레시피 삭제에 실패했습니다");
              }
            });
        } else {
          if (err.response.status === 403) {
            UserNotLogin();
            navigate("/mypage");
          } else {
            ToastErrorMessage("레시피 삭제에 실패했습니다");
          }
        }
      });
  };

  return (
    <>
      <BackSize onClick={BottomMenuStateHandler}>
        {menuState && (
          <MenuBox
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            <ModifyBtn onClick={modifyMenuHandler}>
              <div className="mx-auto my-auto">수정하기</div>
            </ModifyBtn>
            <MenuDeleteBtn onClick={deleteMenuHandler}>
              <div className="mx-auto my-auto">삭제하기</div>
            </MenuDeleteBtn>
            <MenuCloseBtn onClick={BottomMenuStateHandler}>
              <div className="mx-auto my-auto">닫기</div>
            </MenuCloseBtn>
          </MenuBox>
        )}
        {deleteState && (
          <RecipeBox
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            <RecipeTitle>레시피 관리</RecipeTitle>
            <RecipeText>
              <div>
                레시피를 <span>삭제</span> 하시겠습니까?
              </div>
              <div>삭제후 복구 하실수 없습니다</div>
            </RecipeText>
            <RecipeBtn>
              <CloseBtn onClick={BottomMenuStateHandler}>닫기</CloseBtn>
              <DelteBtn onClick={deleteBtnHandler}>삭제하기</DelteBtn>
            </RecipeBtn>
          </RecipeBox>
        )}
      </BackSize>
    </>
  );
};

export default RecipeManageCardMenu;

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

const MenuBox = tw.div`
    absolute
    bg-white
    w-full
    min-w-[21.875rem]
    max-w-[28.125rem]
    h-[8.125rem]
    bottom-[0rem]
    rounded-[0.625rem_0.625rem_0rem_0rem]
    z-50
`;

const ModifyBtn = tw.div`
    h-[2.8125rem]
    flex
    text-[0.9375rem]
    text-common-text-color
    font-bold
    border-b-[0.0938rem]
    border-common-back-color
`;

const MenuCloseBtn = tw.div`
    flex
    h-[2.8125rem]
    text-[0.9375rem]
    font-bold
    text-common-text-color
`;

const MenuDeleteBtn = tw.div`    
    h-[2.5rem]
    flex
    text-[0.9375rem]
    text-seven-r
    font-bold
    border-b-[0.0938rem]
    border-common-white-divider`;

const RecipeBox = tw.div`
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

const RecipeTitle = tw.div`
  w-[full]
  text-center

  h-[60px]
  font-bold
  text-[25px]
  leading-[80px]
  text-common-text-color
`;

const RecipeText = styled.div`
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

const RecipeBtn = tw.div`
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
