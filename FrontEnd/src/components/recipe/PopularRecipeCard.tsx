// import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface popularRecipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
  recipeId: number;
  // 인기레시피용 타입을 지정해야함
  // Intro
  // 들어가는 재료(상품들) 리스트 []
}

const PopularRecipeCard = ({ recipeInfo }: { recipeInfo: popularRecipeType }) => {
  const navigate = useNavigate();

  // 카드 눌렀을 시 레시피 디테일로 이동
  const navigateHandler = (recipeId: number) => {
    navigate(`${recipeId}`);
  };

  return (
    <Container
      onClick={() => {
        navigateHandler(recipeInfo.recipeId);
      }}
    >
      <Title>{recipeInfo.recipeTitle}</Title>
      <Img src={recipeInfo.recipeImg} />
      <Content>
        {/* 재료 */}
        <Ingredients>재료들재료들재료들재료들재료들재료들재료들재료들재료들재료들</Ingredients>

        <div>
          <IconImg src="/img/icons/like-icon-pink.png" /> 좋아요 {recipeInfo.likeCnt}개
        </div>
        <div>
          <IconImg src="/img/icons/view-icon-pink.png" /> 조회수 {recipeInfo.viewCnt}회
        </div>
        <div>
          <IconImg src="/img/icons/comment-icon-pink.png" /> 댓글수 {recipeInfo.commentCnt}개
        </div>
      </Content>
      <Intro>
        냉장고에 채끝살이 없는 자취생들도 맛있는 짜파게티를 먹을 자격이 있다.냉장고에 채끝살이 없는
        자취생들도 맛있는 짜파게티를 먹을 자격이 있다.냉장고에 채끝살이 없는 자취생들도 맛있는
        짜파게티를 먹을 자격이 있다.
      </Intro>
      <Tag>핫 인플루언서</Tag>
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
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-areas:
    "Title Title"
    "Img Content"
    "Intro Intro";
`;

const Title = styled.div`
  grid-area: Title;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 500;
  align-items: center;
  width: 70%;
  margin-top: 0.5rem;
  margin-left: 1.125rem;
  margin-right: 0.625rem;
  /* height: 4rem; */
  word-wrap: break-word;
  overflow: clip;
  display: -webkit-box; // webkit-box
  -webkit-line-clamp: 2; // 2줄까지
  -webkit-box-orient: vertical; //...
`;

const Img = styled.img`
  grid-area: Img;
  width: 11.875rem;
  height: 8.75rem;
  margin: auto;
  src: ${(props) => props.src};
  border-radius: 0.9375rem;
`;

const Ingredients = styled.div`
  margin-right: 1rem;
  overflow: clip;
  display: -webkit-box; // webkit-box
  -webkit-line-clamp: 2; // 2줄까지
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
  grid-template-rows: 1fr 1fr 1fr 1fr;
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
  color: rgb(174 176 182);
  font-size: 0.75rem;
  grid-area: Intro;
  height: 2rem;
  margin-left: 1.125rem;
  margin-right: 1.125rem;
  overflow: hidden;
  display: -webkit-box; // webkit-box
  -webkit-line-clamp: 2; // 2줄까지
  -webkit-box-orient: vertical; //...
`;

const Tag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
