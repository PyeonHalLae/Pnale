import tw from "tailwind-styled-components";
import { commentInfoType } from "./recipeDetailType";
import { Dispatch, SetStateAction } from "react";

interface Props {
  commentInfo: commentInfoType;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const RecipeCommentCard = ({ commentInfo }: Props) => {
  return (
    <CommentCardContainer>
      <ImgBox>
        <Img src={commentInfo.user.usrImg} />
      </ImgBox>
      <ContentBox>
        <CommentNameBox>
          <div className="w-[8rem]">{commentInfo.user.nickname}</div>

          {/* 유저가 같을 때만 노출 */}
          <div className="flex flex-row-reverse w-[calc(100%-8rem)]">
            <CommentManageBtn>삭제</CommentManageBtn>
            <CommentManageBtn>수정</CommentManageBtn>
          </div>
        </CommentNameBox>
        <CommentContentBox>{commentInfo.revDesc}</CommentContentBox>
        <div className="text-[0.625rem] text-common-text-gray-color font-medium">
          {commentInfo.createdAt}
        </div>
      </ContentBox>
    </CommentCardContainer>
  );
};
export default RecipeCommentCard;

const CommentCardContainer = tw.div`
flex min-h-[5rem] mx-[1.875rem] bg-white border-b-[0.0125rem] border-b-common-bold-back-color
p-[0.5rem]
`;

const ImgBox = tw.div`
w-[5rem] my-auto
`;

const Img = tw.img`
w-[2.5rem] h-[2.5rem] rounded-[2.5rem] my-auto
`;

const ContentBox = tw.div`
w-[20rem]
`;

const CommentNameBox = tw.div`
flex text-[1rem] font-medium
`;
const CommentContentBox = tw.div`
flex w-[14.125rem] h-[1.875rem] text-[0.8rem] font-light items-center
`;
const CommentManageBtn = tw.div`
mx-[0.8rem] text-[0.75rem] font-medium text-common-bold-back-color
`;
