import tw from "tailwind-styled-components";

interface commentType {
  commentContent: string;
  userName: string;
  userImg: string;
  createdDate: string;
  commentId: number;
}

const CommentCard = ({ commentInfo }: { commentInfo: commentType }) => {
  return (
    <CommentCardContainer>
      <ImgBox>
        <Img src={commentInfo.userImg} />
      </ImgBox>
      <ContentBox>
        <CommentNameBox>
          <div className="w-[8rem]">{commentInfo.userName}</div>

          <div className="flex flex-row-reverse w-[calc(100%-8rem)]">
            <CommentManageBtn>삭제</CommentManageBtn>
            <CommentManageBtn>수정</CommentManageBtn>
          </div>
        </CommentNameBox>
        <CommentContentBox>{commentInfo.commentContent}</CommentContentBox>
        <div className="text-[0.625rem] text-common-text-gray-color font-medium">
          {commentInfo.createdDate}
        </div>
      </ContentBox>
    </CommentCardContainer>
  );
};
export default CommentCard;

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
mx-[0.8rem] text-[0.8rem] font-medium text-common-bold-back-color
`;
