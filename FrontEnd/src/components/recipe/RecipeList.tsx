import { useEffect, useState } from "react";

import RecipeCard from "@components/common/RecipeCard";

// 레시피 카드
import { recipeType } from "@/model/commonType";

import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import RecipeListHeaderBar from "./recipeListComponent/RecipeListHeaderBar";
import { customAxios } from "@/api/customAxios";
import { popularRecipeType } from "./recipeListComponent/recipeListType";
import PopularRecipeCard from "./recipeListComponent/PopularRecipeCard";

// 제목, 대표사진, 조회수, 좋아요, 댓글수, 작성자닉네임, 작성자이미지, 작성일, 레시피 아이디

const RecipeList = () => {
  const [popularRecipe, setPopularRecipe] = useState<popularRecipeType>();
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);
  const [listSortBy, setListSortBy] = useState<string>("latest");

  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get("/api/recipe", {
        headers: {
          "Content-Type": "application/json",
        },
        // params: {
        //   page: 0,
        //   size: 5,
        // },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        // 인기레시피
        setPopularRecipe(res.data.best);
        // 그냥 레시피 리스트
        setRecipeList(res.data.recipes);
      })
      .catch((err) => {
        const code = err.response.status;
        if (code === 401) {
          customAxios
            .get("http://pnale.online/api/auth/recipe", {
              withCredentials: true,
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(err);
        }
      });
    // setPopularRecipe({
    //   rcpName:
    //     "두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다",
    //   rcpThumbnail: "/img/test/너굴맨레시피.jpg",
    //   rcpSimple: "한줄설명",
    //   member: {
    //     memberId: 1,
    //     nickname: "정현모",
    //     memberImg: "/img/test/너굴맨레시피.jpg",
    //   },
    //   ingredients: ["짜파게티", "너구리", "짜파게티", "너구리", "짜파게티", "너구리"],
    //   viewCnt: 1000,
    //   likeCnt: 1000,
    //   replyCnt: 1000,
    //   rcpId: 1,
    //   influence: true,
    //   like: true,
    // });
    setRecipeList([
      {
        rcpName:
          "두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다",
        rcpThumbnail: "/img/test/너굴맨레시피.jpg",
        member: {
          memberId: 1,
          nickname: "정현모",
          memberImg: "/img/test/너굴맨레시피.jpg",
        },
        viewCnt: 1000,
        likeCnt: 1000,
        replyCnt: 1000,
        createdAt: "2020.20.20",
        rcpId: 1,
        influence: true,
        like: true,
        myRecipe: false,
      },
    ]);
  }, []);

  return (
    <Container>
      {/* 서치바포함된 헤더 누르면 레시피 서치 페이지로 이동해야함 */}
      <RecipeListHeaderBar />

      <ContentTitle>
        <TitleTextPeach>인기</TitleTextPeach>
        <TitleText>레시피</TitleText>
      </ContentTitle>

      {/* 인기 레시피 컨테이너 */}
      {popularRecipe === undefined ? (
        <PopularRecipeContainer>앗 인기레시피가 없어요!</PopularRecipeContainer>
      ) : (
        <PopularRecipeCard popularRecipe={popularRecipe} />
      )}

      {/* 전체 레시피 컨테이너 */}

      <ContentTitle>
        <TitleTextOrange>전체 </TitleTextOrange>
        <TitleText>레시피</TitleText>

        <SortSelectBox
          value={listSortBy}
          onChange={(e) => {
            console.log(e.target.value);
            setListSortBy(() => {
              return e.target.value;
            });
          }}
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
        </SortSelectBox>
      </ContentTitle>

      {/* 5개씩 늘어날 것. */}
      {recipeList.map((recipeItem, index) => (
        <RecipeCard
          // onClick={navigateHandler(recipeItem.recipeId)}
          key={recipeItem.rcpName + index}
          recipeInfo={recipeItem}
        />
      ))}

      {/* 새 레시피 등록 버튼 */}
      <ViewMoreBtnBox>
        <ViewMoreBtn
          onClick={() => {
            console.log("ㅎㅎ");
          }}
        >
          더보기
        </ViewMoreBtn>
      </ViewMoreBtnBox>

      <CreateBtn
        onClick={() => {
          navigate("/recipe/create");
        }}
        src="/img/btn/create-recipe.png"
      />
    </Container>
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
  w-[4.6875rem] h-[1.5rem] text-[1rem]
  bottom-[0.625rem] right-[1rem] outline-0
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
