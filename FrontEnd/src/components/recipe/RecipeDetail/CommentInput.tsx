import tw from "tailwind-styled-components";
import { useState } from "react";
// import { useEffect } from "react";

const CommentInput = () => {
  const [commentContent, setCommentContent] = useState("");

  // 댓글 내용 입력
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
    console.log(commentContent);
  };

  // 작성하기 버튼 클릭
  const commentCreateHandler = () => {
    console.log(commentContent);
  };

  return (
    <Container>
      <NameBox>작성자 명</NameBox>
      <InputBox onChange={inputChangeHandler} placeholder="내용을 입력하세요">
        {commentContent}
      </InputBox>
      <div className="flex flex-row-reverse">
        <CreateBtn onClick={commentCreateHandler}>
          <div>작성하기</div>
        </CreateBtn>
      </div>
    </Container>
  );
};

export default CommentInput;

const Container = tw.div`
min-h-[5rem] mx-[1.875rem] p-[0.5rem] pb-[3rem]
`;

const NameBox = tw.div`
font-semibold
`;
const InputBox = tw.textarea`
block w-[100%] py-[0.875rem] px-[0.8125rem] my-[0.25rem] items-center text-common-bold-back-color
 bg-common-back-color border-[1px] border-common-bold-back-color outline-none resize-none
`;
const CreateBtn = tw.div`
flex w-[3.875rem] h-[1.375rem] rounded-[0.3125rem] bg-common-text-color
 text-white text-[0.625rem] font-bold justify-center items-center
`;
