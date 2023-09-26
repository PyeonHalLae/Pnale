// json으로 Back에 보낼예정
export interface recipeFormType {
  //   레시피제목
  recipeTitle: string;
  //   레시피 메인이미지 (업로드시 S3 파일올라가고 S3 파일 URL 보낼예정)
  recipeImg: string;
  //   레시피 한줄소개
  intro: string;
  //   관련영상 Url
  relatedUrl: string;
  //   Craeted, recipeId 필요없을듯? 어짜피 BE처리할듯
  //   createdDate: string;
  //   recipeId: number;
  ingredients: productFormType[];
  //   레시피 내용 (HTML 태그로 보낼것)
  contents: string;
}

export interface productFormType {
  productId: number;
  isChangeable: boolean;
}

// 재료 = [{재료id: 1, isChangeable: true}, {재료id: 1, isChangeable: true}, {재료id: 1, isChangeable: true},
