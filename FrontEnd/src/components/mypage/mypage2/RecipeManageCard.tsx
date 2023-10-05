// import { useEffect, useState } from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface recipeMemberType {
  memberId: number;
  nickname: string;
  memberImg: string;
}
interface recipeInfoType {
  rcpId: number;
  rcpName: string;
  member: recipeMemberType;
  rcpSimple: string;
  rcpThumbnail: string;
  createdAt: string;
  likeCnt: number;
  replyCnt: number;
  viewCnt: number;
  like: boolean;
  myRecipe: boolean;
  influence: boolean;
}

interface Props {
  $recipeInfo: recipeInfoType;
  myRecipeType: string;
  BottomMenuStateHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  SelectRecipeIdHandler: (repid: number) => void;
  LikeMenuStateHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const RecipeManageCard = ({
  $recipeInfo,
  myRecipeType,
  BottomMenuStateHandler,
  SelectRecipeIdHandler,
  LikeMenuStateHandler,
}: Props) => {
  const navigate = useNavigate();

  const MenuBtnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    SelectRecipeIdHandler($recipeInfo.rcpId);
    BottomMenuStateHandler(e);
  };

  const LikeBtnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    SelectRecipeIdHandler($recipeInfo.rcpId);
    LikeMenuStateHandler(e);
  };

  const recipeImgRef = useRef(null);
  const titleRef = useRef(null);
  const [titleStyleState, setTitleStyleState] = useState<boolean>(false);
  const ImageErrorHandler = () => {
    recipeImgRef.current.src = "/img/sticker/noimage.jpg";
  };

  //높이 설정
  useEffect(() => {
    const titleStyle = window.getComputedStyle(titleRef.current);
    const titleHeight = parseFloat(titleStyle.height);
    //한줄이라면
    if (titleHeight < 40) {
      setTitleStyleState(true);
    } else {
      setTitleStyleState(false);
    }
  }, []);

  return (
    <Container
      onClick={() => {
        navigate("/recipe/" + $recipeInfo.rcpId);
      }}
    >
      {/* 레시피 이미지 */}
      <RecipeImg
        src={$recipeInfo.rcpThumbnail}
        alt="레시피이미지"
        onError={ImageErrorHandler}
        ref={recipeImgRef}
      />

      {/* 이미지 외의 영역 */}
      <ContentBox>
        {/* 관리 버튼 */}
        {myRecipeType === "MYRECIPE" ? (
          <MenuBtn $imgurl={"/img/btn/menu-btn.png"} onClick={MenuBtnClickHandler} />
        ) : (
          <MenuBtn $imgurl={"/img/btn/close-btn.png"} onClick={LikeBtnClickHandler} />
        )}
        {/* 조회수박스 */}
        <ViewCountBox>
          <ViewIcon src="/img/icons/view-icon-gray.png" alt="조회" />
          {$recipeInfo.viewCnt}
        </ViewCountBox>

        {/* 레시피 제목 */}
        <Title ref={titleRef} className={titleStyleState && "mt-[0.9375rem] mb-[0.3125rem]"}>
          {$recipeInfo.rcpName}
        </Title>

        {/* 유저 닉네임, 유저 이미지 */}
        {$recipeInfo.influence === true ? (
          <div className="inline-block text-[0.8rem] text-white bg-common-peach justify-center px-1 my-auto h-[1rem]">
            인플루언서
          </div>
        ) : (
          <div className="text-[0.8rem] text-common-text-gray-color justify-center align-top">
            by {$recipeInfo.member.nickname}
            <img
              className="w-[1.5rem] h-[1.5rem] rounded-[0.8rem] ml-2 inline-block"
              src={$recipeInfo.member.memberImg}
              alt="유저이미지"
            />
          </div>
        )}
        {/* 작성일 */}
        <div className="relative text-[0.6rem] bottom-70  text-common-text-gray-color">
          {$recipeInfo.createdAt.substring(0, $recipeInfo.createdAt.indexOf("T"))}
        </div>
      </ContentBox>

      {/* 좋아요 댓글 우하단 박스 */}
      <LikeCommentBox>
        <LikeCommentIcon src="/img/icons/like-icon-pink.png" alt="좋아요" />
        {$recipeInfo.likeCnt}
        <LikeCommentIcon src="/img/icons/comment-icon-pink.png" alt="댓글" />
        {$recipeInfo.replyCnt}
      </LikeCommentBox>
    </Container>
  );
};

export default RecipeManageCard;

const Container = tw.div`
 relative 
 min-w-[22.5rem] 
 max-w-[28.125rem] 
 min-h-[7.5rem]
bg-white 
grid grid-cols-5 
my-[.625rem] 
items-center;
`;

const RecipeImg = tw.img`
 max-w-[8.75rem] 
 max-h-[7.5rem] 
 w-[8rem] 
 h-[6.25rem] 
 rounded-[.3125rem] 
 m-auto 
 col-span-2
`;

const ContentBox = tw.div`
  h-[6.25rem] 
  col-span-3 
  my-[0.5rem]
`;

const ViewCountBox = tw.div`
relative 
top-0 text-[0.6rem]  
text-common-text-gray-color
w-[6.25rem]
`;

const LikeCommentBox = tw.div`
  absolute bottom-[0.25rem] right-[0.25rem] text-[0.6rem] text-common-text-gray-color
`;

const ViewIcon = tw.img`
   w-[0.75rem] h-[0.75rem] inline-block mr-[0.3rem]
`;

const LikeCommentIcon = tw(ViewIcon)`
  ml-[0.3rem]
`;

const Title = styled.div`
  font-size: 1rem;
  width: 13.75rem;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MenuBtn = styled.div<{ $imgurl: string }>`
  float: right;
  margin-right: 0.625rem;
  margin-top: -0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background-image: url(${(props) => props.$imgurl});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
