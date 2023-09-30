import { useParams } from "react-router-dom";

import RecipeCommentBox from "./recipeDetailComponent/RecipeCommentBox";
import RecipeDetailContent from "./recipeDetailComponent/RecipeDetailContent";
import RecipeRelatedVideo from "./recipeDetailComponent/RecipeRelatedVideo";
import RecipeProductsList from "./recipeDetailComponent/RecipeProductsList";
import RecipeDetailHeader from "./recipeDetailComponent/RecipeDetailHeader";
import RecipeDetailHeaderBar from "./recipeDetailComponent/RecipeDetailHeaderBar";
import { customAxios } from "./../../api/customAxios";
import { useRecoilValue } from "recoil";
import { recipeDetailInfo } from "@/recoil/khiRecoil";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const recipeInfo = useRecoilValue(recipeDetailInfo);

  customAxios
    .get("/api/recipe/detail", {
      params: {
        rcpId: 4,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data.recipe);
      //   "recipe": {
      //     "rcpId": 47,                                              // 레시피ID
      //     "rcpName": "짜파구리",                                    // 레시피명
      //     "user": {
      //         "usrId": 4,                                                // 유저정보
      //         "nickname": "정현모",
      //         "usrImg": "https://amazon...",
      //         },
      //     "createdAt": "2023-09-10",                               // 쓴 날짜
      //     "rcpSimp" : "...",                                       // 요약
      //     "rcpDesc" : "...",                                       // 본문
      //     "rcpVideo": "...",                                       // 레시피 관련 영상
      //     "likeCnt" : 1000,                                        // 좋아요 갯수
      //     "replyCnt" : 2,                                          // 댓글 갯수
      //     "viewCnt" : 50000,                                       // 조회수
      //     "influence": true,                                       // 인플루언서 여부
      //     "like" : true                                            // 좋아요 여부
      // },
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <RecipeDetailHeaderBar />

      <RecipeDetailHeader mainImgUrl={recipeInfo.rcpImg} />

      <RecipeProductsList />
      {/* 레시피 재료 추가해야함 */}
      <RecipeRelatedVideo videoUrl={recipeInfo.rcpVideo} />

      <RecipeDetailContent content={recipeInfo.rcpDesc} />

      <RecipeCommentBox recipeId={Number(recipeId)} />
    </div>
  );
};

export default RecipeDetail;
