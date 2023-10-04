// import styled from "styled-components";
// import axios from "axios";
import styled from "styled-components";
import tw from "tailwind-styled-components";

interface Props {
  $selectCommentId: number;
  BottomMenuStateHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CommentCardMemu = ({ $selectCommentId, BottomMenuStateHandler }: Props) => {
  // 삭제하기 클릭
  const deleteBtnHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log($selectCommentId);
    // BottomMenuStateHandler(e);
  };
  return (
    <>
      <BackSize onClick={BottomMenuStateHandler}>
        <CommentBox
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          <CommentTitle>레시피 삭제</CommentTitle>
          <CommentText>
            <div>
              댓글을 <span>삭제</span> 하시겠습니까?
            </div>
            <div>삭제후 복구 하실수 없습니다</div>
          </CommentText>
          <CommentBtn>
            <CloseBtn onClick={BottomMenuStateHandler}>닫기</CloseBtn>
            <DelteBtn onClick={deleteBtnHandler}>삭제하기</DelteBtn>
          </CommentBtn>
        </CommentBox>
      </BackSize>
    </>
  );
};

export default CommentCardMemu;

const BackSize = tw.div`
    fixed
    bg-[rgba(51,51,51,0.8)]
    min-w-[350xp]
    max-w-[450px]
    w-full
    h-full
    top-0
    z-40
`;

const CommentBox = tw.div`
    absolute
    bg-white
    w-[90%]
    h-[300px]
    left-[5%]
    top-[35%]
    rounded-[0.625rem_0.625rem_0.625rem_0.625rem]
    z-50
`;

const DelteBtn = tw.div``;

const CommentTitle = tw.div``;

const CommentText = styled.div``;

const CommentBtn = tw.div``;

const CloseBtn = tw.div``;
