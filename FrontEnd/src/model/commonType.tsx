// 제품 공통 카드의 할인 정보
export type mainCard = {
  cudate: string;
  cutype: string;
  emartdate: string;
  emarttype: string;
  gsdate: string;
  gstype: string;
  sevendate: string;
  seventype: string;
  productResponseDto: productResponseDto;
  userLikeProdResponseDto: null | string; // 실제 타입에 따라 수정
};
// 제품 공통 카드의 제품정보
export type productResponseDto = {
  productId: number;
  productName: string;
  productImg: string;
  price: number;
  category: string;
  hit: number;
  pb: string | null;
  productDesc: string | null;
  recommand: number;
  // 다른 필드들도 여기에 추가
};

// 레시피 카드 타입
export type recipeType = {
  recipeTitle: string;
  recipeImg: string;
  viewCnt: number;
  likeCnt: number;
  commentCnt: number;
  userName: string;
  userImg: string;
  createdDate: string;
  recipeId: number;
};
