// 상품 정보 카드

//제품 공통 카드 메인
export type ProductComp = {
  event: CompEvent;
  product: CompProduct;
  userLike: CompUserLike;
};

// 제품 공통 카드의 할인 정보;
export type CompEvent = {
  cudate: string;
  cutype: string;
  emartdate: string;
  emarttype: string;
  gsdate: string;
  gstype: string;
  sevendate: string;
  seventype: string;
};

// 제품 공통 카드의 제품정보
export type CompProduct = {
  category: string;
  hit: number;
  pb: string | null;
  price: number;
  productDesc: string | null;
  productId: number;
  productImg: string;
  productName: string;
  recommand: number;
  // 다른 필드들도 여기에 추가
};

// 제품 공통 카드의 유저 좋아요
export type CompUserLike = {
  likeStat: boolean;
  pickProdId?: string;
  received: boolean;
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
