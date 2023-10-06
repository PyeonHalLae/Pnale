// import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { popularRecipeType } from "./recipeListType";

// 인기레시피용 타입을 지정해야함
// Intro
// 들어가는 재료(상품들) 리스트 []

const PopularRecipeCard = ({ popularRecipe }: { popularRecipe: popularRecipeType }) => {
  const navigate = useNavigate();

  // 카드 눌렀을 시 레시피 디테일로 이동
  const navigateHandler = (recipeId: number) => {
    navigate(`${recipeId}`);
  };

  return (
    <Container
      onClick={() => {
        navigateHandler(popularRecipe.rcpId);
      }}
    >
      <Title>{popularRecipe.rcpName}</Title>
      <Img src={popularRecipe.rcpThumbnail} />
      <Content>
        {/* 재료 */}
        {popularRecipe.ingredients.length !== 0 &&
          popularRecipe.ingredients.map((prd, index) => {
            if (index < 2) {
              return <Ingredients key={index}># {prd}</Ingredients>;
            }
          })}
        <div>
          <IconImg src="/img/icons/like-icon-pink.png" /> 좋아요 {popularRecipe.likeCnt}개
        </div>
        <div>
          <IconImg src="/img/icons/view-icon-pink.png" /> 조회수 {popularRecipe.viewCnt}회
        </div>
        <div>
          <IconImg src="/img/icons/comment-icon-pink.png" /> 댓글수 {popularRecipe.replyCnt}개
        </div>
      </Content>

      <Intro>{popularRecipe.rcpSimple}</Intro>
      {/* 인플루언서 게시물일때 태그 다르게 */}
      {popularRecipe.influence ? (
        <Tag src="/img/sticker/recipe/hot&inf.png" />
      ) : (
        <Tag src="/img/sticker/recipe/hot.png" />
      )}
    </Container>
  );
};

export default PopularRecipeCard;

// const Container = tw.div`
// min-w-[22.5rem] max-w-[28.125rem] h-[18.125rem] my-[.625rem]
// display: grid;
// grid-auto-columns: 1fr;
// grid-auto-rows: 1fr;
// grid-template-columns: 3fr 2fr;
// grid-template-rows: 1fr 2fr 1fr;
// gap: 0px 0px;
// grid-template-areas:
//   "Title Title"
//   "Img Content"
//   "Intro Intro";
// `;

const Container = styled.div`
  position: relative;
  background-color: #fff;
  min-width: 22.5rem;
  max-width: 28.125rem;
  height: 18.125rem;
  margin-top: 0.62rem;
  margin-bottom: 0.625rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 6fr 1fr;
  grid-template-areas:
    "Title Title"
    "Img Content"
    "Intro Intro";
`;

const Title = styled.div`
  grid-area: Title;
  font-size: 1.6875rem;
  font-style: normal;
  font-weight: 500;
  color: #1e2b4f;
  align-items: center;
  width: 70%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1.125rem;
  margin-right: 0.625rem;
  height: 2.5rem;
  word-wrap: break-word;
  overflow: clip;
  display: -webkit-box; // webkit-box
  -webkit-line-clamp: 2; // 2줄까지
  -webkit-box-orient: vertical; //...
`;

const Img = styled.img`
  grid-area: Img;
  /* width: 12.75rem; */
  height: 10.5rem;
  max-width: 12rem;
  margin: auto;
  src: ${(props) => props.src};
  border-radius: 0.9375rem;
  object-fit: cover;
  padding-left: 5px;
  padding-right: 5px;
  /* border-radius: 25px; */
`;

const Ingredients = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
  overflow: clip;
  display: -webkit-box; // webkit-box
  -webkit-line-clamp: 1; // 2줄까지
  -webkit-box-orient: vertical; //...
`;

const IconImg = styled.img<{ src: string }>`
  display: inline-block;
  width: 1.0625rem;
  height: 0.9375rem;
  src: ${(props) => props.src};
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  margin: 0.1rem;
  font-size: 0.8rem;
  div {
    color: rgb(174 176 182);
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0.3rem;
  }
`;

const Intro = styled.div`
  max-height: 2.4rem;
  padding-top: 0.5rem;
  padding-bottom: 2.5rem;
  color: rgb(174 176 182);
  font-size: 0.75rem;
  font-weight: lighter;
  grid-area: Intro;
  margin-left: 1.125rem;
  margin-right: 1.125rem;
  overflow: hidden;
  display: -webkit-box; // webkit-box
  -webkit-line-clamp: 2; // 2줄까지
  -webkit-box-orient: vertical; //...
`;

const Tag = styled.img`
  width: 6rem;
  height: 1.6rem;
  position: absolute;
  top: 0;
  right: 0;
`;
