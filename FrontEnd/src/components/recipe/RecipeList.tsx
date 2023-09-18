import { useEffect, useState } from "react";

import RecipeCard from "@components/common/RecipeCard";
import PopularRecipeRoller from "./PopularRecipeRoller";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";

interface recipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
  recipeId: number;
}
// 제목, 대표사진, 조회수, 좋아요, 댓글수, 작성자닉네임, 작성자이미지, 작성일, 레시피 아이디

const RecipeList = () => {
  const [popularRecipeList, setPopularRecipeList] = useState<recipeType[]>([]);
  const [recipeList, setRecipeList] = useState<recipeType[]>([]);
  const [listSortBy, setListSortBy] = useState<string>("latest");

  const navigate = useNavigate();

  useEffect(() => {
    setRecipeList([
      {
        recipeTitle:
          "두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다",
        recipeImg: "/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        recipeId: 1,
        // recipeId 도 받아와야함
      },
    ]);
    setPopularRecipeList([
      {
        recipeTitle: "두줄제목두줄제목두줄제목두줄제목두줄제목두줄제목두줄제목두줄제목",
        recipeImg: "/img/test/너굴맨레시피.jpg",
        viewCnt: 1000,
        likeCnt: 1000,
        commentCnt: 1000,
        userName: "정현모",
        userImg: "/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        recipeId: 1,
        // recipeId 도 받아와야함
      },
    ]);
  }, []);

  return (
    <div className="relative">
      <div>로고</div>
      <div>서치바</div>
      <div>
        <ContentTitle>
          <TitleTextPeach>인기</TitleTextPeach>
          <TitleText>레시피</TitleText>
        </ContentTitle>
        {/* 인기 레시피 컨테이너 */}
        <PopularRecipeRoller popularRecipeList={popularRecipeList} />
      </div>

      {/* 전체 레시피 컨테이너 */}
      <div>
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
        <div>
          {/* 5개씩 늘어날 것. */}
          {recipeList.map((recipeItem, index) => (
            <RecipeCard
              // onClick={navigateHandler(recipeItem.recipeId)}
              key={recipeItem.recipeTitle + index}
              recipeInfo={recipeItem}
            />
          ))}
          {recipeList.map((recipeItem, index) => (
            <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
          ))}
          {recipeList.map((recipeItem, index) => (
            <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
          ))}
          {recipeList.map((recipeItem, index) => (
            <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
          ))}
          {recipeList.map((recipeItem, index) => (
            <RecipeCard key={recipeItem.recipeTitle + index} recipeInfo={recipeItem} />
          ))}
        </div>
      </div>
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

export default RecipeList;

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
  w-[4.6875rem] h-[4.6875rem] rounded-[4.6875rem] fixed z-[2] bottom-[5rem] right-[1.75rem]
`;