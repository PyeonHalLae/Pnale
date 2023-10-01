export interface commentInfoType {
  revId: number;
  writer: memberInfoType;
  createdAt: string;
  content: string;
  myReview: boolean;
}

export interface memberInfoType {
  memberId: number;
  nickname: string;
  memberImg: string;
}

export interface recipePrdInfoType {
  prdId: number;
  prdName: string;
  price: number;
  changeable: boolean;

  cuprice: number | null;
  cutype: string | null;

  gsprice: number | null;
  gstype: string | null;

  sevenprice: number | null;
  seventype: string | null;

  emartprice: number | null;
  emarttype: string | null;
}

export interface recipeDetailType {
  rcpId: number;
  rcpName: string;
  rcpThumbnail: string;
  member: memberInfoType; // 작성유저정보
  ingredients: recipePrdInfoType[]; //디테일 재료 정보
  createdAt: string;
  rcpSimple: string; // 요약
  rcpDesc: string; // 본문
  rcpVideo: string; // 레시피 관련 영상
  likeCnt: number; // 좋아요 갯수
  replyCnt: number; // 댓글 갯수
  viewCnt: number; // 조회수
  influence: boolean; // 인플루언서 여부
  like: boolean; // 좋아요했는지 여부
  myRecipe: boolean; // 내 레시피인지 여부
}
