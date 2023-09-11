import styled from "styled-components";

interface RecipeType {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: Date;
}

const RecipeCard = ({ recipeInfo }: { recipeInfo: RecipeType }) => {
  return (
    <RecipyCardBox>
      <ImgBox>
        <img src={recipeInfo.recipeImg} alt="레시피이미지" />
      </ImgBox>
      <div>
        <div>조회수 : {recipeInfo.viewCnt}</div>
        <div>제목 : {recipeInfo.recipeTitle}</div>
        <div>
          by {recipeInfo.userName}
          <img src={recipeInfo.userImg} alt="유저이미지" />
        </div>
      </div>
      <InfluencerTag>인플루언서</InfluencerTag>
      <LikeCommentBox>
        좋아요 : {recipeInfo.likeCnt}
        댓글 : {recipeInfo.commentCnt}
      </LikeCommentBox>
    </RecipyCardBox>
  );
};

export default RecipeCard;

const RecipyCardBox = styled.div`
  position: relative;
  width: auto;
  height: 7.5rem;
  background-color: white;
  border: 1px solid gray;
  display: grid;
  grid-template-columns: 2fr 3fr;
`;

const ImgBox = styled.div`
  margin: auto;
`;
const InfluencerTag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3.75rem;
  height: 1.125rem;
  background-color: #fa709a;
  text-align: center;
  color: white;
  font-size: 12px;
`;

const LikeCommentBox = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  border: 0.5px solid black;
`;
