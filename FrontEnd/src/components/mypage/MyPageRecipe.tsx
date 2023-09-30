import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import RecipeManageCard from "@components/mypage/mypage2/RecipeManageCard";
import axios from "axios";

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

  const [myRecipeState, setMyRecipeState] = useState<boolean>(false);
  const [likeRecipeState, setLikeRecipeState] = useState<boolean>(false);
  const [recipeType, setRecipeType] = useState<string>("MYRECIPE");
  const [recipeList, setRecipeList] = useState<recipeInfoType[]>([]);

  const OnMyRecipe = () => {
    if (!myRecipeState) {
      setMyRecipeState(true);
      setLikeRecipeState(false);
      setRecipeType("MYRECIPE");
      axios
        .get("/api/mypage/recipe?page=0")
        .then((res) => {
          console.log(res.data.data.content, "성공");
          setRecipeList(res.data.data.content);
        })
        .catch((err) => {
          console.log("에러!", err);
          const code = err.response.status;
          //토큰이 있었으나 만료된 경우
          if (code === 401) {
            console.log("토큰은 있으나 만료되어 다시 재발급 합니다!");
            axios
              .get("/api/auth/mypage/recipe?page=0")
              .then((res) => {
                console.log(res.data.data.content, "재발급");
                setRecipeList(res.data.data.content);
              })
              .catch((err) => {
                console.log("토큰이 만료 되었으니 재로그인 부탁드립니다", err);
              });
          } else {
            console.log("로그인이 안되어있었나봐요! ");
          }
        });
    }
  };

  const OnLikeRecipe = () => {
    if (!likeRecipeState) {
      setMyRecipeState(false);
      setLikeRecipeState(true);
      setRecipeType("LIKERECIPE");
      //엑시오스 들어갈 예정
      axios
        .get("/api/mypage/pick_recipe?page=0")
        .then((res) => {
          console.log(res.data.data.content, "성공");
          setRecipeList(res.data.data.content);
        })
        .catch((err) => {
          console.log("에러!", err);
          console.log(err.response);
          const code = err.response.status;
          //토큰이 있었으나 만료된 경우
          if (code === 401) {
            console.log("토큰은 있으나 만료되어 다시 재발급 합니다!");
            axios
              .get("/api/auth/mypage/pick_recipe?page=0")
              .then((res) => {
                console.log(res.data.data.content, "재발급");
                setRecipeList(res.data.data.content);
              })
              .catch((err) => {
                console.log("토큰이 만료 되었으니 재로그인 부탁드립니다", err);
              });
          } else {
            console.log("로그인이 안되어있었나봐요! ");
            console.log(err);
          }
        });
    }
  };

  useEffect(() => {
    OnMyRecipe();
  }, []);

  return (
    <>
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
              OnMyRecipe();
            }}
          >
            내 레시피
          </MyRecipeBtn>
          <LikeRecipeBtn
            className={`${likeRecipeState ? "border-b-4" : "border-b-0"}`}
            onClick={() => {
              OnLikeRecipe();
            }}
          >
            좋아요한 레시피
          </LikeRecipeBtn>
        </SideBtn>
      </MyRecipeHeader>
      <MyRecipeMain>
        {recipeList.map((recipeItem) => (
          <RecipeManageCard
            key={recipeItem.rcpId}
            $recipeInfo={recipeItem}
            myRecipeType={recipeType}
          />
        ))}
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
