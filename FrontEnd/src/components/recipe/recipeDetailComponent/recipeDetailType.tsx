export interface commentInfoType {
  revId: number;
  user: userInfoType;
  createdAt: string;
  revDesc: string;
}

export interface userInfoType {
  usrId: number;
  nickname: string;
  usrImg: string;
}

export interface recipeDetailType {
  rcpId: number;
  rcpName: string;
  rcpImg: string;
  user: userInfoType; // 작성유저정보
  createdAt: string;
  rcpSimp: string; // 요약
  rcpDesc: string; // 본문
  rcpVideo: string; // 레시피 관련 영상
  likeCnt: number; // 좋아요 갯수
  replyCnt: number; // 댓글 갯수
  viewCnt: number; // 조회수
  influence: boolean; // 인플루언서 여부
  like: boolean;
}
