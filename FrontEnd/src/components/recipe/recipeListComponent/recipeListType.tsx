export type popularRecipeType = {
  rcpId: number;
  rcpName: string;
  rcpThumbnail: string;

  member: {
    memberId: number;
    nickname: string;
    memberImg: string;
  };
  rcpSimple: string;
  ingredients: string[];

  likeCnt: number;
  replyCnt: number;
  viewCnt: number;

  influence: boolean;
  like: boolean;
};
