export type Test = {
  test: string;
};

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
