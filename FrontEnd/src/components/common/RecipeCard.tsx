import styled from "styled-components";
import tw from "tailwind-styled-components";

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

const RecipeCard = ({ recipeInfo }: { recipeInfo: recipeType }) => {
  // recipeInfo = {
  //   recipeTitle: "두줄제목입니다입니다입니다입니다",
  //   recipeImg: "/public/img/test/너굴맨레시피.jpg",
  //   viewCnt: 1000,
  //   likeCnt: 1000,
  //   commentCnt: 1000,
  //   userName: "정현모",
  //   userImg: "/public/img/test/너굴맨레시피.jpg",
  //   createdDate: "2020.20.20",
  // };
  return (
    <RecipyCardBox>
      {/* 레시피 이미지 */}
      <img
        className="max-w-[8.75rem] max-h-[7.5rem] w-[8rem] h-[6.25rem] rounded-[.3125rem] m-auto"
        src={recipeInfo.recipeImg}
        alt="레시피이미지"
      />

      <div className="h-[6.25rem]">
        <div className="relative top-0 text-[0.6rem]  text-common-text-gray-color">
          <img
            className="w-[0.75rem] h-[0.75rem] inline-block mr-[0.3rem]"
            src="/img/icon/viewIconGray.png"
          />
          {recipeInfo.viewCnt}
        </div>
        <div className="text-[1.1rem]">{recipeInfo.recipeTitle}</div>
        <div className="text-[0.8rem] text-common-text-gray-color justify-center align-top">
          by {recipeInfo.userName}
          <img
            className="w-[0.8rem] h-[0.8rem] rounded-[0.8rem] ml-2 inline-block"
            src={recipeInfo.userImg}
            alt="유저이미지"
          />
        </div>
        <div className="relative text-[0.6rem] bottom-70  text-common-text-gray-color">
          {recipeInfo.createdDate}
        </div>
      </div>
      <InfluencerTag>인플루언서</InfluencerTag>
      <LikeCommentBox>
        <img
          className="w-[0.75rem] h-[0.75rem] inline-block mx-[0.3rem]"
          src="img/icon/likeIconPink.png"
        />
        {recipeInfo.likeCnt}
        <img
          className="w-[0.75rem] h-[0.75rem] inline-block mx-[0.3rem]"
          src="/img/icon/commentIconPink.png"
        />
        {recipeInfo.commentCnt}
      </LikeCommentBox>
    </RecipyCardBox>
  );
};

export default RecipeCard;

const RecipyCardBox = styled.div`
  position: relative;
  width: 100vw;
  max-width: 28.125rem;
  min-height: 7.5rem;
  background-color: white;
  /* border: 1px solid gray; */
  display: grid;
  grid-template-columns: 2fr 3fr;
  margin-bottom: 0.625rem;
  margin-top: 0.625rem;
  align-items: center;
`;

// const ImgBox = styled.div`
//   margin: auto;
// `;
const InfluencerTag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3.75rem;
  height: 0.9rem;
  background-color: #fa709a;
  text-align: center;
  color: white;
  font-size: 0.6rem;
`;

const LikeCommentBox = styled.div`
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  font-size: 0.6rem;
  /* background-color: #fff; */
  /* border: 0.5px solid black; */
  color: #aeb0b6;
`;

const IconImg = styled.img<{ iconSrc: string }>`
  display: inline-block;
  src: ${(props) => props.iconSrc};
  width: 0.75rem;
  height: 0.75rem;
`;
