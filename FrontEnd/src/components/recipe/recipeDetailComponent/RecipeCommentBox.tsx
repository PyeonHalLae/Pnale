// import styled from "styled-components";
import tw from "tailwind-styled-components";
import RecipeCommentCard from "./RecipeCommentCard";
import RecipeCommentInput from "./RecipeCommentInput";
import { useEffect, useState } from "react";
import { customAxios } from "./../../../api/customAxios";
import { commentInfoType } from "./recipeDetailType";

const RecipeCommentBox = ({ recipeId }: { recipeId: number }) => {
  const [commentList, setCommentList] = useState<commentInfoType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    // 처음 렌더링될 때 받아옴
    customAxios
      .get("/api/recipe/reply", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + "key value",
        },
        params: { rcpId: recipeId },
      })
      .then((res) => {
        setCommentList(res.data.replys);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipeId, refresh]);

  return (
    <Container>
      <CommentBoxHeader>
        <div className="inline-block">댓글</div>
        {/* 댓글 리스트 length 넣어야함 */}
        <div className="inline-block ml-[0.625rem] text-common-orange">{commentList.length}</div>
      </CommentBoxHeader>

      {commentList.map((commentItem, index) => (
        <RecipeCommentCard
          key={commentItem.revId + index}
          commentInfo={commentItem}
          setRefresh={setRefresh}
        />
      ))}

      <RecipeCommentInput recipeId={recipeId} setRefresh={setRefresh} />
    </Container>
  );
};

export default RecipeCommentBox;

const Container = tw.div`
h-auto w-[100%] bg-white text-common-text-color
`;

const CommentBoxHeader = tw.div`
    pt-[1.75rem] pl-[1.94rem] pb-[0.875rem] text-[1.5rem]
`;
