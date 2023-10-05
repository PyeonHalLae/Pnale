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
  const [textareaHeight, setTextareaHeight] = useState({
    row: 1,
    lineBreak: {},
  });
  const [isLogined, setIsLogined] = useState<boolean>(false);

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
        setIsLogined(() => true);
      });
  }, []);

  const resizeTextareaHanlder = (e) => {
    const { scrollHeight, clientHeight, value } = e.target;

    // 줄바꿈이 일어날 때
    if (scrollHeight > clientHeight) {
      setTextareaHeight((prev) => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [value.length - 1]: true },
      }));
    }

    // 텍스트 지워서 줄바꿈 지점에 도달했을 때
    if (textareaHeight.lineBreak[value.length]) {
      setTextareaHeight((prev) => ({
        row: prev.row - 1,
        lineBreak: { ...prev.lineBreak, [value.length]: false },
      }));
    }
  };

  const onKeyEnterHandler = (e) => {
    if (e.code === "Enter") {
      setTextareaHeight((prev) => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [e.target.value.length]: true },
      }));
    }
  };

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
        if (res.data.code === 201) {
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
    <>
      {isLogined ? (
        <Container>
          <NameBox>{nickname}</NameBox>
          <InputBox
            onChange={inputChangeHandler}
            placeholder="내용을 입력하세요"
            value={commentContent}
            onInput={resizeTextareaHanlder}
            onKeyDown={onKeyEnterHandler}
            rows={textareaHeight.row}
          />
          <div className="flex flex-row-reverse">
            <CreateBtn onClick={commentCreateHandler}>
              <div>작성하기</div>
            </CreateBtn>
          </div>
        </Container>
      ) : (
        <Container>댓글이 없습니다</Container>
      )}
    </>
  );
};

export default RecipeCommentInput;

const Container = tw.div`
mx-[1.875rem] p-[0.5rem] pb-[3rem] mb-[1.875rem]
`;

const NameBox = tw.div`
font-semibold
`;

const InputBox = tw.textarea`
block 
w-[100%] 
py-[0.875rem] 
px-[0.8125rem] 
my-[0.25rem] 
items-center 
text-common-bold-back-color
bg-common-back-color 
border-[1px] 
border-common-bold-back-color
outline-none 
resize-none
`;
const CreateBtn = tw.div`
flex w-[3.875rem] h-[1.375rem] rounded-[0.3125rem] bg-common-text-color
 text-white text-[0.625rem] font-bold justify-center items-center
`;
