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
        <img src={commentInfo.userImg} className="w-[2.5rem] h-[2.5rem] rounded-[2.5rem] my-auto" />
      </ImgBox>
      <ContentBox>
        {commentInfo.userName}
        {commentInfo.commentContent}
        {commentInfo.createdDate}
      </ContentBox>
    </CommentCardContainer>
  );
};
export default CommentCard;

const CommentCardContainer = tw.div`
flex h-[5rem] mx-[1.875rem] bg-white border-b-[0.0125rem] border-b-common-bold-back-color
`;

const ImgBox = tw.div`
h-[5rem] w-[5rem] mr-[0.94rem] 
`;

const ContentBox = tw.div`
h-[5rem] w-auto
`;
