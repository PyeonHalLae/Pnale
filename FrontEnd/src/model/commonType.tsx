// 메인화면 정보 카드 - 김동민
export type RecipeAndRecommand = {
  recipe: RecipeInfo;
  recommands: ProductComp[];
};
//제품 공통 카드 메인 - 김동민
export type ProductComp = {
  event: CompEvent;
  product: CompProduct;
  userLike: CompUserLike;
};

// 제품 공통 카드의 할인 정보 - 김동민
export type CompEvent = {
  cuprice: string;
  cutype: string;
  emartprice: string;
  emarttype: string;
  gsprice: string;
  gstype: string;
  sevenprice: string;
  seventype: string;
};

// 검색창 입력시 자동 완성 추천 타입 - 김동민
export type SearchResponseToRecommand = {
  category: string;
  id: number;
  name: string;
};

// 제품 공통 카드의 제품정보 - 김동민
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
};

// 제품 공통 카드의 유저 좋아요 - 김동민
export type CompUserLike = {
  likeStat: boolean;
  pickProdId?: string;
  received: boolean;
};

// 제품 공통 카드의 유저 좋아요 - 김동민
export type RecipeInfo = {
  content: recipeType[];
  influence: boolean;
  ingredients: string[];
  like: boolean;
  likeCnt: number;
  member: memberInfo;
  rcpId: number;
  rcpName: string;
  rcpSimple: string;
  rcpThumnail: string;
  rcpVideoUrl: string;
  replyCnt: number;
  viewCnt: number;
};

// 제품 공통 카드의 유저 좋아요 - 김동민
export type memberInfo = {
  memberId: number;
  memberImg: string;
  nickname: string;
};

// 레시피 카드 타입
export type recipeType = {
  rcpId: number;
  rcpName: string;
  rcpThumbnail: string;

  member: {
    memberId: number;
    nickname: string;
    memberImg: string;
  };

  createdAt: string;
  likeCnt: number;
  replyCnt: number;
  viewCnt: number;

  influence: boolean;
  like: boolean;
  myRecipe: boolean;
};
