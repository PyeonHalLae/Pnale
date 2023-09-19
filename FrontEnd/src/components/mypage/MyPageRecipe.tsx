import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import RecipeManageCard from "@components/mypage/mypage2/RecipeManageCard";

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

const MyPageRecipe = () => {
  const navigate = useNavigate();

  const [myRecipeState, setMyRecipeState] = useState<boolean>(true);
  const [likeRecipeState, setLikeRecipeState] = useState<boolean>(false);
  const [recipeType, setRecipeType] = useState<string>("MYRECIPE");
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);

  useEffect(() => {
    setRecipeList([
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
      {
        recipeTitle: "두줄제목입니다입니다입니다입니다",
        recipeImg: "/public/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/public/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        // recipeId 도 받아와야함
      },
    ]);
  }, []);

  const OnMyRecipe = () => {
    if (!myRecipeState) {
      setMyRecipeState(true);
      setLikeRecipeState(false);
      setRecipeType("MYRECIPE");
      //엑시오스 들어갈 예정
    }
  };

  const OnLikeRecipe = () => {
    if (!likeRecipeState) {
      setMyRecipeState(false);
      setLikeRecipeState(true);
      setRecipeType("LIKERECIPE");
      //엑시오스 들어갈 예정
    }
  };

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
        {recipeList.map((recipeItem, index) => (
          <RecipeManageCard
            key={recipeItem.recipeTitle + index}
            recipeInfo={recipeItem}
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
