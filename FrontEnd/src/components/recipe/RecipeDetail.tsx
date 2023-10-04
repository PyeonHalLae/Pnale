import { useParams } from "react-router-dom";

import RecipeCommentBox from "./recipeDetailComponent/RecipeCommentBox";
import RecipeDetailContent from "./recipeDetailComponent/RecipeDetailContent";
import RecipeRelatedVideo from "./recipeDetailComponent/RecipeRelatedVideo";
import RecipeProductsList from "./recipeDetailComponent/RecipeProductsList";
import RecipeDetailHeader from "./recipeDetailComponent/RecipeDetailHeader";
import RecipeDetailHeaderBar from "./recipeDetailComponent/RecipeDetailHeaderBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { recipeDetailType } from "./recipeDetailComponent/recipeDetailType";
import { UserInfoExpires, UserNotLogin } from "@/model/toastMessageJHM";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipeInfo, setRecipeInfo] = useState<recipeDetailType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(true);
  // const [bottomMenuState, setBottomMenuState] = useState<boolean>(true);

  useEffect(() => {
    setLoading(() => {
      return true;
    });

    axios
      .get("/api/recipe/detail", {
        params: {
          rcpId: recipeId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setRecipeInfo(() => {
          return res.data.data;
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.state === 401) {
          console.log("리프레시 토큰 재발급");

          axios
            .get("/api/auth/recipe/detail", {
              params: {
                rcpId: recipeId,
              },
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              //재발급이 잘되서 정보를 받아온경우
              console.log(res.data.data);
              setRecipeInfo(() => {
                return res.data.data;
              });
              setLoading(false);
            })
            .catch((err) => {
              console.log("재발급 실패");
              if (err.response.status === 403) {
                //재발급 실패! 재로그인 해주세요!!
                UserInfoExpires();
              } else {
                console.log("서버 오류 발생");
              }
            });
        } else {
          console.log(err);
          if (err.response.status === 403) {
            //처음부터 토큰이 없는경우 ! 로그인화면 보여준다
            UserNotLogin();
          } else {
            //그외 서버 오류
            console.log("서버 오류 발생");
          }
        }

        console.log(err);
      });
  }, [refresh]);

  const detailRefreshHandler = () => {
    setRefresh((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div>
          <RecipeDetailHeaderBar recipeId={recipeInfo.rcpId} myRecipe={recipeInfo.myRecipe} />

          <RecipeDetailHeader recipeInfo={recipeInfo} detailRefreshHandler={detailRefreshHandler} />

          <RecipeProductsList ingredients={recipeInfo.ingredients} />
          {/* 레시피 재료 추가해야함 */}
          <RecipeRelatedVideo videoUrl={recipeInfo.rcpVideo} />

          <RecipeDetailContent content={recipeInfo.rcpDesc} />

          <RecipeCommentBox
            recipeId={Number(recipeId)}
            detailRefreshHandler={detailRefreshHandler}
          />
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
