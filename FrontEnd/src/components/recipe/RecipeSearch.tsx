import Header from "@components/common/Header";
import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import RecipeCard from "@components/common/RecipeCard";
import { useNavigate } from "react-router-dom";
import { recipeType } from "@/model/commonType";

const RecipeSearch = () => {
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);
  const [listSortBy, setListSortBy] = useState<string>("latest");
  const navigate = useNavigate();

  useEffect(() => {
    setRecipeList([
      {
        rcpName:
          "두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다",
        rcpThumbnail: "/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        replyCnt: 1000,
        member: {
          nickname: "",
          memberId: 1,
          memberImg: "",
        },
        createdAt: "2020.20.20",
        rcpId: 1,
        myRecipe: false,
        influence: false,
        like: false,
        // recipeId 도 받아와야함
      },
    ]);
  }, []);

  return (
    <div>
      <Header />
      <ContentTitle>
        <TitleTextPeach>검색 </TitleTextPeach>
        <TitleText>결과</TitleText>

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
    </div>
  );
};

export default RecipeSearch;

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
