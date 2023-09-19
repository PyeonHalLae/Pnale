import tw from "tailwind-styled-components";
import { useState } from "react";
import { useEffect } from "react";

const CommentInput = () => {
  const [commentContent, seCommentContent] = useState<string>();

  useEffect(() => {
    seCommentContent("");
  }, []);

  // 댓글 내용 입력
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    seCommentContent(e.target.value);
    console.log(e.target.value);
  };

  // 작성하기 버튼 클릭
  const commentCreateHandler = () => {
    console.log(commentContent);
    seCommentContent("");
  };

  return (
    <Container>
      <NameBox>작성자 명</NameBox>
      <InputBox>
        <input
          className="bg-common-back-color w-[100%] text-common-text-gray-color outline-none"
          type="text"
          onChange={inputChangeHandler}
          value={commentContent}
        />
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
const InputBox = tw.div`
flex min-h-[2.4375rem] py-[0.875rem] px-[0.8125rem] my-[0.25rem] items-center
 bg-common-back-color border-[1px] border-common-bold-back-color 
`;
const CreateBtn = tw.div`
flex w-[3.875rem] h-[1.375rem] rounded-[0.3125rem] bg-common-text-color
 text-white text-[0.625rem] font-bold justify-center items-center
`;
