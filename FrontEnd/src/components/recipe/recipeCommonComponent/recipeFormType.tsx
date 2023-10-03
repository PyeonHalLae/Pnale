// json으로 Back에 보낼예정
export interface recipeFormType {
  //   레시피제목
  rcpName: string;
  //   레시피 메인이미지 (업로드시 S3 파일올라가고 S3 파일 URL 보낼예정)
  // recipeImg: string;
  //   레시피 한줄소개
  rcpSimple: string;
  //   관련영상 Url
  rcpVideo: string;
}

export interface productFormType {
  prdId: number;
  prdName: string;
  changeable: boolean;
}
