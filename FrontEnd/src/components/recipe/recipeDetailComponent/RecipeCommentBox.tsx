// import styled from "styled-components";
import tw from "tailwind-styled-components";
import RecipeCommentCard from "./RecipeCommentCard";
import RecipeCommentInput from "./RecipeCommentInput";
import { useEffect, useState } from "react";
import { commentInfoType } from "./recipeDetailType";
import axios from "axios";

const RecipeCommentBox = ({
  recipeId,
  detailRefreshHandler,
}: {
  recipeId: number;
  detailRefreshHandler: () => void;
}) => {
  const [commentList, setCommentList] = useState<commentInfoType[]>([]);
  const [totalCommentNum, setTotalCommentNum] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const viewMoreHanlder = () => {
    setPage((prev) => {
      return prev + 1;
    });

    axios
      .get(`/api/recipe/review?rcpId=${recipeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: { page: page },
      })
      .then((res) => {
        if (res.data.code === 200) {
          setCommentList((prev) => {
            return [...prev, ...res.data.data.content];
          });
          setTotalCommentNum(res.data.data.totalElements);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // 처음 렌더링될 때 받아옴
    axios
      .get(`/api/recipe/review?rcpId=${recipeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: { page: 0 },
      })
      .then((res) => {
        if (res.data.code === 200) {
          setCommentList(res.data.data.content);
          setTotalCommentNum(res.data.data.totalElements);
        }
        console.log(res);
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
        <div className="inline-block ml-[0.625rem] text-common-orange">{totalCommentNum}</div>
      </CommentBoxHeader>

      {commentList.length != 0 &&
        commentList.map((commentItem) => (
          <RecipeCommentCard
            key={commentItem.revId}
            commentInfo={commentItem}
            setRefresh={setRefresh}
            detailRefreshHandler={detailRefreshHandler}
          />
        ))}
      {commentList.length !== totalCommentNum && (
        <ViewMoreBtnBox>
          <ViewMoreBtn onClick={viewMoreHanlder}>더보기</ViewMoreBtn>
        </ViewMoreBtnBox>
      )}

      <RecipeCommentInput
        recipeId={recipeId}
        setRefresh={setRefresh}
        detailRefreshHandler={detailRefreshHandler}
      />
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

const ViewMoreBtnBox = tw.div`
  flex min-w-[22.5rem] max-w-[28.125rem] py-[1.25rem] justify-center items-center my-[.625rem]
  text-common-text-gray-color 
`;
const ViewMoreBtn = tw.button`
  w-[4.6875rem] h-[1.5rem] text-center
`;
