import tw from "tailwind-styled-components";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";

interface Props {
  recipeId: number;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  detailRefreshHandler: () => void;
}

const RecipeCommentInput = ({ recipeId, setRefresh, detailRefreshHandler }: Props) => {
  const [commentContent, setCommentContent] = useState("");
  const [nickname, setNickname] = useState<string>("작성자명");

  useEffect(() => {
    // 유저이름 받아옴
    axios
      .get("/api/member/login", {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then((res) => {
        setNickname(() => {
          return res.data.data.nickname;
        });
      });
  }, []);

  // 댓글 내용 입력
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
    // console.log(e.target);
  };

  // 작성하기 버튼 클릭
  const commentCreateHandler = () => {
    const data = commentContent;
    axios
      .post(`/api/recipe/review?rcpId=${recipeId}`, data, {
        headers: {
          "Content-Type": "text/plain",
        },
        withCredentials: true,
      })
      .then((res) => {
        // 작성 성공시
        console.log(res);
        if (res.data.code === "200") {
          setCommentContent("");
          setRefresh((prev) => {
            return !prev;
          });
          detailRefreshHandler();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <NameBox>{nickname}</NameBox>
      <InputBox
        onChange={inputChangeHandler}
        placeholder="내용을 입력하세요"
        value={commentContent}
      />
      <div className="flex flex-row-reverse">
        <CreateBtn onClick={commentCreateHandler}>
          <div>작성하기</div>
        </CreateBtn>
      </div>
    </Container>
  );
};

export default RecipeCommentInput;

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
