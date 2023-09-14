// import tw from "tailwind-styled-components";
import styled from "styled-components";

interface recipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
  // 인기레시피용 타입을 지정해야함
  // Intro
  // 들어가는 재료(상품들)
}

const PopularRecipeCard = ({ recipeInfo }: { recipeInfo: recipeType }) => {
  return (
    <Container>
      <Title>{recipeInfo.recipeTitle}</Title>
      <Img src={recipeInfo.recipeImg} />
      <Content>
        {/* 재료 */}
        <div>재료들</div>

        <div>
          <IconImg src="/public/img/icon/likeIconPink.png" /> 좋아요 {recipeInfo.likeCnt}개
        </div>
        <div>
          <IconImg src="/public/img/icon/viewIconPink.png" /> 조회수 {recipeInfo.viewCnt}회
        </div>
        <div>
          <IconImg src="/public/img/icon/commentIconPink.png" /> 댓글수 {recipeInfo.commentCnt}개
        </div>
      </Content>
      <Intro>냉장고에 채끝살이 없는 자취생들도 맛있는 짜파게티를 먹을 자격이 있다.</Intro>
      <Tag>호롤로</Tag>
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
  height: 18.75rem;
  margin-top: 0.62rem;
  margin-bottom: 0.625rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 3fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Title Title"
    "Img Content"
    "Intro Intro";
`;

const Title = styled.div`
  grid-area: Title;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-items: center;
  width: 85%;
  margin: 0.3rem;
`;

const Img = styled.img`
  grid-area: Img;
  width: 12.75rem;
  height: 10.5rem;
  margin: auto;
  src: ${(props) => props.src};
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
  margin: 0.3rem;
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
  font-size: 0.9375rem;
  grid-area: Intro;
  margin: 0.3rem 0.5rem;
`;

const Tag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
