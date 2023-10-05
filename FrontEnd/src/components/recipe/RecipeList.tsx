import { useEffect, useState } from "react";

import RecipeCard from "@components/common/RecipeCard";

// 레시피 카드
import { recipeType } from "@/model/commonType";

import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import RecipeListHeaderBar from "./recipeListComponent/RecipeListHeaderBar";
import { popularRecipeType } from "./recipeListComponent/recipeListType";
import PopularRecipeCard from "./recipeListComponent/PopularRecipeCard";
import axios from "axios";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

// 제목, 대표사진, 조회수, 좋아요, 댓글수, 작성자닉네임, 작성자이미지, 작성일, 레시피 아이디

const RecipeList = () => {
  const [popularRecipe, setPopularRecipe] = useState<popularRecipeType>();
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);
  const [listSortBy, setListSortBy] = useState<string>("recipeId,desc");
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalRecipeNum, setTotalRecipeNum] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/recipe", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          page: 0,
          size: 3,
          sort: listSortBy,
        },
      })
      .then((res) => {
        console.log(res);
        // 인기레시피
        setPopularRecipe(res.data.data.best);
        // 그냥 레시피 리스트
        setRecipeList(res.data.data.recipes.content);
        setTotalRecipeNum(res.data.data.recipes.totalElements);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [listSortBy]);

  const viewMoreHandler = () => {
    axios
      .get(`/api/recipe/all`, {
        withCredentials: true,
        params: { page: page, size: 3, sort: listSortBy },
      })
      .then((res) => {
        console.log(totalRecipeNum);
        if (res.data.code === 200) {
          setRecipeList((recipeList) => {
            return [...recipeList, ...res.data.data.content];
          });
          setPage((prev) => {
            return prev + 1;
          });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createBtnClickHandler = () => {
    axios
      .get("/api/member/login", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        navigate("/recipe/create"); // 데이터
      })
      .catch((error) => {
        const code = error.response.status;
        if (code === 401) {
          // 액세스토큰이 있으나 유효하지 않은 경우
          axios
            .get("/api/auth/member/login", {
              withCredentials: true,
            })
            .then(() => {
              navigate("/recipe/create");
            })
            .catch(() => {
              ToastErrorMessage("로그인이 필요합니다");
              navigate("/sociallogin");
            });
        } else {
          ToastErrorMessage("로그인이 필요합니다");
          navigate("/sociallogin");
        }
      });
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Container>
          {/* 서치바포함된 헤더 누르면 레시피 서치 페이지로 이동해야함 */}
          <RecipeListHeaderBar />

          <ContentTitle>
            <TitleTextPeach>인기</TitleTextPeach>
            <TitleText>레시피</TitleText>
          </ContentTitle>

          {/* 인기 레시피 컨테이너 */}
          {popularRecipe ? (
            <PopularRecipeCard popularRecipe={popularRecipe} />
          ) : (
            <PopularRecipeContainer>앗 인기레시피가 없어요!</PopularRecipeContainer>
          )}

          {/* 전체 레시피 컨테이너 */}

          <ContentTitle>
            <TitleTextOrange>전체 </TitleTextOrange>
            <TitleText>레시피</TitleText>

            <SortSelectBox
              value={listSortBy}
              onChange={(e) => {
                setPage(() => 1);
                setListSortBy(() => {
                  return e.target.value;
                });
              }}
            >
              <option value="recipeId,desc">최신순</option>
              <option value="likeCnt,desc">인기순</option>
              <option value="recipeId,asc">오래된순</option>
              <option value="likeCnt,asc">인기역순</option>
            </SortSelectBox>
          </ContentTitle>

          {/* 5개씩 늘어날 것. */}
          {recipeList &&
            recipeList.map((recipeItem, index) => (
              <RecipeCard
                // onClick={navigateHandler(recipeItem.recipeId)}
                key={recipeItem.rcpName + index}
                recipeInfo={recipeItem}
              />
            ))}

          {recipeList.length !== totalRecipeNum && (
            <ViewMoreBtnBox>
              <ViewMoreBtn onClick={viewMoreHandler}>더보기</ViewMoreBtn>
            </ViewMoreBtnBox>
          )}

          <CreateBtn onClick={createBtnClickHandler} src="/img/btn/create-recipe.png" />
        </Container>
      )}
    </>
  );
};

export default RecipeList;

const Container = tw.div`
relative 
min-w-[22.5rem] 
max-w-[28.125rem]
`;

const ContentTitle = tw.div`
relative
  min-w-[22.5rem] max-w-[28.125rem] h-[3.75rem] 
  pt-[1rem] pb-[.625rem] pl-[1.125rem] 
  my-[.625rem] bg-white 
`;

const TitleText = tw.div`
  text-[1.5rem] text-common-text-color h-[100%] inline-block align-text-bottom
`;
const TitleTextPeach = tw(TitleText)`
  text-common-peach border-t-common-peach border-t-[.1875rem] mr-[.25rem] box-content
`;
const TitleTextOrange = tw(TitleTextPeach)`
  text-common-orange border-t-common-orange
`;

// 여기고쳐야함
const SortSelectBox = tw.select`
  absolute
  w-[5.625rem] h-[1.5rem] text-[1rem]
  bottom-[0.625rem] right-[1rem] outline-0 text-common-text-color
`;

const ViewMoreBtnBox = tw.div`
  flex min-w-[22.5rem] max-w-[28.125rem] py-[1.25rem] justify-center items-center my-[.625rem]
  text-common-text-gray-color 
`;
const ViewMoreBtn = tw.button`
  w-[4.6875rem] h-[1.5rem] text-center
`;

const CreateBtn = tw.img`
  w-[4.6875rem] h-[4.6875rem] rounded-[4.6875rem] fixed z-[2] bottom-[5rem] right-[calc(50%-11rem)]
`;

const PopularRecipeContainer = tw.div`  
relatvie
bg-white
min-w-[22.5rem]
max-w-[28.125rem]
h-[18.125rem]
mt-[0.62rem]
mb-[0.625rem]
position: relative;
text-center
py-24`;
