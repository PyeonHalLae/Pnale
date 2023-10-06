import tw from "tailwind-styled-components";
import { commentInfoType } from "./recipeDetailType";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface Props {
  commentInfo: commentInfoType;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  detailRefreshHandler: () => void;
}

const RecipeCommentCard = ({ commentInfo, setRefresh, detailRefreshHandler }: Props) => {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [modifyContent, setModifyContent] = useState<string>(commentInfo.content);
  const [textareaHeight, setTextareaHeight] = useState({
    row: 1,
    lineBreak: {},
  });

  const contentRef = useRef(null);
  const [contentheight, setContentheight] = useState<string>(null);

  const commentDeleteHandler = () => {
    axios
      .delete(`/api/recipe/review?revId=${commentInfo.revId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
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
  const commentModifyHandler = async () => {
    const contentStyle = await window.getComputedStyle(contentRef.current);
    const heightSize = await contentStyle.height;
    setContentheight(heightSize);
  };

  useEffect(() => {
    if (contentheight != null) {
      setIsModifying(true);
      console.log(contentheight);
    }
  }, [contentheight]);

  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyContent(() => {
      return e.target.value;
    });
  };

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

  const modifySubmitHandler = () => {
    axios
      .patch(`/api/recipe/review?revId=${commentInfo.revId}`, modifyContent, {
        withCredentials: true,
        headers: {
          "Content-Type": "text/plain", // Content-Type을 text/plain으로 설정
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          setIsModifying(false);
          setRefresh((prev) => {
            return !prev;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CommentCardContainer>
      <ImgBox>
        <Img src={commentInfo.writer.memberImg} />
      </ImgBox>
      <ContentBox>
        <CommentNameBox>
          <div className="w-[8rem]">{commentInfo.writer.nickname}</div>

          {/* 유저가 같을 때만 노출 */}
          {commentInfo.myReview && (
            <div className="flex flex-row-reverse w-[calc(100%-8rem)]">
              <CommentManageBtn onClick={commentDeleteHandler}>삭제</CommentManageBtn>
              <CommentManageBtn onClick={commentModifyHandler}>수정</CommentManageBtn>
            </div>
          )}
        </CommentNameBox>
        {/* <div className="flex flex-row-reverse w-[calc(100%-8rem)]">
          <CommentManageBtn onClick={commentDeleteHandler}>삭제</CommentManageBtn>
          <CommentManageBtn onClick={commentModifyHandler}>수정</CommentManageBtn>
          <div
            onClick={() => {
              console.log(contentheight);
            }}
          >
            테스트
          </div>
        </div> */}
        {isModifying ? (
          // 수정중일 경우 Textarea로 변경
          <CommentContentTextBox>
            <CommentContentBoxTextarea
              value={modifyContent}
              onChange={contentChangeHandler}
              onKeyDown={onKeyEnterHandler}
              onInput={resizeTextareaHanlder}
              rows={textareaHeight.row}
              $contentheight={contentheight}
            ></CommentContentBoxTextarea>
            <div
              className="absolute bottom-[0.5rem] right-[0.5rem] w-[2rem] h-[1rem] bg-common-text-gray-color"
              onClick={modifySubmitHandler}
            >
              완료
            </div>
          </CommentContentTextBox>
        ) : (
          <CommentContentBox ref={contentRef}>{commentInfo.content}</CommentContentBox>
        )}

        <div className="text-[0.625rem] text-common-text-gray-color font-medium">
          {commentInfo.createdAt.substring(0, 10)} {commentInfo.createdAt.substring(11, 16)}
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
flex w-[14.125rem] min-h-[1.875rem] text-[0.8rem] font-light items-center
`;

const CommentContentTextBox = tw.div`
flex 
w-[14.125rem] 
text-[0.8rem] 
font-light 
items-center 
relative
`;

//#f7f7f7;
const CommentContentBoxTextarea = styled.textarea<{ $contentheight: string }>`
  display: flex;
  border: 1px solid black;
  width: 14.125rem;
  font-size: 0.8rem;
  position: relative;
  align-items: center;
  height: ${(props) => props.$contentheight};
`;

const CommentManageBtn = tw.div`
mx-[0.8rem] text-[0.75rem] font-medium text-common-bold-back-color
`;
