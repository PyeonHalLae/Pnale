import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import RecipeManageCard from "@components/mypage/mypage2/RecipeManageCard";
import axios from "axios";
import RecipeManageCardMenu from "./mypage2/RecipeManageCardMenu";
import RecipeManagerCardLike from "./mypage2/RecipeManagerCardLike";

interface recipeMemberType {
  memberId: number;
  nickname: string;
  memberImg: string;
}
interface recipeInfoType {
  rcpId: number;
  rcpName: string;
  member: recipeMemberType;
  rcpSimple: string;
  rcpThumbnail: string;
  createdAt: string;
  likeCnt: number;
  replyCnt: number;
  viewCnt: number;
  like: boolean;
  myRecipe: boolean;
  influence: boolean;
}

const MyPageRecipe = () => {
  const navigate = useNavigate();

  const [myRecipeState, setMyRecipeState] = useState<boolean>(true);
  const [likeRecipeState, setLikeRecipeState] = useState<boolean>(false);
  const [recipeType, setRecipeType] = useState<string>("MYRECIPE");
  const [recipeList, setRecipeList] = useState<recipeInfoType[] | null>([]);

  //페이지를 위한 state
  const [totalPage, setTotalPage] = useState<number>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  //메뉴를 위한 State
  const [bottomMenuState, setBottomMenuState] = useState<boolean>(false);
  const [likeMenuState, setLikeMenuState] = useState<boolean>(false);
  const [selectRecipeId, setSelectRecipeId] = useState<number>(null);

  //하단 메뉴 (내레시피) 출력 State 변경
  const BottomMenuStateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setBottomMenuState(!bottomMenuState);
  };

  //중앙 메뉴 (종아요 레시피) 출력 state 변경
  const LikeMenuStateHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setLikeMenuState(!likeMenuState);
  };

  //하단 메뉴 레시피아이디 변경
  const SelectRecipeIdHandler = (recipeId: number) => {
    setSelectRecipeId(recipeId);
  };

  //레시피 삭제시 List에서 제거
  const UpdateRecipeList = () => {
    const updatedRecipeList = recipeList.filter((comment) => comment.rcpId !== selectRecipeId);
    setRecipeList(updatedRecipeList);
  };

  const MyRecipeAxiosHandler = () => {
    axios
      .get("/api/mypage/recipe?page=" + currentPage, { withCredentials: true })
      .then((res) => {
        if (res.data.code === 200) {
          setRecipeList([...recipeList, ...res.data.data.content]);
          setCurrentPage((prev) => prev + 1);
          setTotalPage(res.data.data.totalPages);
        }
        if (res.data.code === 204) {
          setRecipeList(null);
        }
      })
      .catch((err) => {
        const code = err.response.status;
        //토큰이 있었으나 만료된 경우
        if (code === 401) {
          axios
            .get("/api/auth/mypage/recipe?page=" + currentPage, { withCredentials: true })
            .then((res) => {
              if (res.data.code === 200) {
                setRecipeList([...recipeList, ...res.data.data.content]);
                setCurrentPage((prev) => prev + 1);
                setTotalPage(res.data.data.totalPages);
              }
              if (res.data.code === 204) {
                setRecipeList(null);
              }
            })
            .catch((err) => {
              console.log("토큰이 만료 되었으니 재로그인 부탁드립니다", err);
              if (err.response.status === 403) {
                setRecipeList(null);
              }
            });
        } else {
          console.log("로그인이 안되어있었나봐요! ", err);
          if (code === 403) {
            setRecipeList(null);
          }
        }
      });
  };

  const LikeAxiosHandler = () => {
    axios
      .get("/api/mypage/pick_recipe?page=" + currentPage, { withCredentials: true })
      .then((res) => {
        console.log(res, "성공");
        if (res.data.code === 200) {
          setRecipeList([...recipeList, ...res.data.data.content]);
          setCurrentPage((prev) => prev + 1);
          setTotalPage(res.data.data.totalPages);
        }
        if (res.data.code === 204) {
          setRecipeList(null);
        }
      })
      .catch((error) => {
        const code = error.response.status;
        //토큰이 있었으나 만료된 경우
        if (code === 401) {
          console.log("토큰은 있으나 만료되어 다시 재발급 합니다!");
          axios
            .get("/api/auth/mypage/pick_recipe?page=" + currentPage, { withCredentials: true })
            .then((res) => {
              console.log(res, "성공");
              if (res.data.code === 200) {
                setRecipeList([...recipeList, ...res.data.data.content]);
                setCurrentPage((prev) => prev + 1);
                setTotalPage(res.data.data.totalPages);
              }
              if (res.data.code === 204) {
                setRecipeList(null);
              }
            })
            .catch((err) => {
              console.log("토큰이 만료 되었으니 재로그인 부탁드립니다", err);
              if (err.response.status === 403) {
                setRecipeList(null);
              }
            });
        } else {
          console.log("로그인이 안되어있었나봐요! ", error);
          if (code === 403) {
            setRecipeList(null);
          }
        }
      });
  };

  const ChangeRecipe = async (type: string) => {
    const newList: [] = [];
    setRecipeList(newList);
    setCurrentPage(0);
    setTotalPage(null);

    setTimeout(() => {
      if (type === "LIKERECIPE") {
        setMyRecipeState(false);
        setLikeRecipeState(true);
        setRecipeType("LIKERECIPE");
      }
      if (type === "MYRECIPE") {
        setMyRecipeState(true);
        setLikeRecipeState(false);
        setRecipeType("MYRECIPE");
      }
    }, 0);
  };

  useEffect(() => {
    if (recipeType === "LIKERECIPE") {
      LikeAxiosHandler();
    }
    if (recipeType === "MYRECIPE") {
      MyRecipeAxiosHandler();
    }
  }, [recipeType]);

  return (
    <>
      {bottomMenuState && (
        <RecipeManageCardMenu
          $selectRecipeId={selectRecipeId}
          BottomMenuStateHandler={BottomMenuStateHandler}
          UpdateRecipeList={UpdateRecipeList}
        />
      )}
      {likeMenuState && (
        <RecipeManagerCardLike
          $selectRecipeId={selectRecipeId}
          LikeMenuStateHandler={LikeMenuStateHandler}
          UpdateRecipeList={UpdateRecipeList}
        />
      )}
      <MyRecipeHeader>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title>레시피 관리</Title>
        <SideBtn>
          <MyRecipeBtn
            className={`${myRecipeState ? "border-b-4" : "border-b-0"}`}
            onClick={() => {
              if (recipeType !== "MYRECIPE") ChangeRecipe("MYRECIPE");
            }}
          >
            내 레시피
          </MyRecipeBtn>
          <LikeRecipeBtn
            className={`${likeRecipeState ? "border-b-4" : "border-b-0"}`}
            onClick={() => {
              if (recipeType !== "LIKERECIPE") ChangeRecipe("LIKERECIPE");
            }}
          >
            좋아요한 레시피
          </LikeRecipeBtn>
        </SideBtn>
      </MyRecipeHeader>
      <MyRecipeMain>
        {recipeList === null
          ? null
          : recipeList.map((recipeItem) => (
              <RecipeManageCard
                key={recipeItem.rcpId}
                $recipeInfo={recipeItem}
                myRecipeType={recipeType}
                BottomMenuStateHandler={BottomMenuStateHandler}
                SelectRecipeIdHandler={SelectRecipeIdHandler}
                LikeMenuStateHandler={LikeMenuStateHandler}
              />
            ))}
        <RecipeAddBox>
          {totalPage > 1 && currentPage < totalPage && (
            <AddBtn
              onClick={() => {
                if (recipeType === "MYRECIPE") MyRecipeAxiosHandler();
                if (recipeType === "LIKERECIPE") LikeAxiosHandler();
              }}
            >
              더보기
            </AddBtn>
          )}
        </RecipeAddBox>
      </MyRecipeMain>
    </>
  );
};

export default MyPageRecipe;

const MyRecipeHeader = tw.div`
  h-[150px] bg-white
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

const MyRecipeBtn = tw.div`
  ml-[0.625rem]
  h-[2.0125rem]  
  border-common-text-color
  `;

const LikeRecipeBtn = tw.div`
  ml-[0.9375rem]
  h-[2.0125rem]  
  border-common-text-color
`;

const MyRecipeMain = tw.div`
  overflow-scroll
  h-[calc(100%-9.375rem)]

`;

const RecipeAddBox = tw.div`
  flex h-24
`;

const AddBtn = tw.div`mx-auto my-auto  text-common-text-gray-color  text-[20px]`;
