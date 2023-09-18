// import styled from "styled-components";
import tw from "tailwind-styled-components";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import { useEffect, useState } from "react";

interface commentType {
  commentContent: string;
  userName: string;
  userImg: string;
  createdDate: string;
  commentId: number;
}

const CommentBox = () => {
  const [commentList, setCommentList] = useState<commentType[]>([]);
  useEffect(() => {
    setCommentList([
      {
        commentContent:
          "두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다두줄제목입니다입니다입니다입니다",
        userName: "정현모",
        userImg: "/img/test/너굴맨레시피.jpg",
        createdDate: "2020.20.20",
        commentId: 1,
      },
    ]);
  }, []);

  return (
    <Container>
      <CommentBoxHeader>
        <div className="inline-block">댓글</div>
        {/* 댓글 리스트 length 넣어야함 */}
        <div className="inline-block ml-[0.625rem] text-common-orange">{commentList.length}</div>
      </CommentBoxHeader>
      {commentList.map((commentItem, index) => (
        <CommentCard key={commentItem.commentId + index} commentInfo={commentItem} />
      ))}
      {commentList.map((commentItem, index) => (
        <CommentCard key={commentItem.commentId + index} commentInfo={commentItem} />
      ))}
      {commentList.map((commentItem, index) => (
        <CommentCard key={commentItem.commentId + index} commentInfo={commentItem} />
      ))}
      {commentList.map((commentItem, index) => (
        <CommentCard key={commentItem.commentId + index} commentInfo={commentItem} />
      ))}
      {commentList.map((commentItem, index) => (
        <CommentCard key={commentItem.commentId + index} commentInfo={commentItem} />
      ))}
      <CommentInput />
    </Container>
  );
};

export default CommentBox;

const Container = tw.div`
h-auto w-[100%] bg-white text-common-text-color
`;

const CommentBoxHeader = tw.div`
    pt-[1.75rem] pl-[1.94rem] pb-[0.875rem] text-[1.5rem]
`;
