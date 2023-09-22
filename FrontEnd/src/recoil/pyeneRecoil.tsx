import { atom } from "recoil";

export const preProductView = atom<{ type: string }>({
  key: "preProductView",
  default: { type: "EVENT" },
});

export interface FilterType {
  name: string;
  state: boolean;
  engName: string;
}

export const EventFilterDefault = atom<{ data: FilterType[] }>({
  key: "EventFilterDefault",
  default: {
    data: [
      { name: "1 + 1", state: false, engName: "OPO" },
      { name: "2 + 1", state: false, engName: "TPO" },
      { name: "3 + 1", state: false, engName: "THPO" },
      { name: "할인", state: false, engName: "DISC" },
      { name: "덤 증정", state: false, engName: "MORE" },
      { name: "기타", state: false, engName: "" },
    ],
  },
});

//   const CategoryMealList: FilterType[] = [
//     { name: "도시락", state: false, engName: "" },
//     { name: "샌드위치", state: false, engName: "" },
//     { name: "햄버거", state: false, engName: "" },
//     { name: "주먹밥", state: false, engName: "" },
//     { name: "김밥", state: false, engName: "" },
//   ];

//   const CategoryCookList: FilterType[] = [
//     { name: "즉석튀김", state: false, engName: "" },
//     { name: "즉석베이커리", state: false, engName: "" },
//     { name: "즉석커피", state: false, engName: "" },
//     { name: "즉석식품", state: false, engName: "" },
//   ];

//   const CategorySnackList: FilterType[] = [
//     { name: "스낵", state: false, engName: "" },
//     { name: "비스캣", state: false, engName: "" },
//     { name: "빵", state: false, engName: "" },
//     { name: "디저트", state: false, engName: "" },
//     { name: "캔디", state: false, engName: "" },
//     { name: "초콜릿", state: false, engName: "" },
//     { name: "껌", state: false, engName: "" },
//     { name: "젤리", state: false, engName: "" },
//   ];

//   const CategoryFoodList: FilterType[] = [
//     { name: "가공식품", state: false, engName: "" },
//     { name: "안주류", state: false, engName: "" },
//     { name: "식재료", state: false, engName: "" },
//     { name: "밀키트", state: false, engName: "" },
//     { name: "조미료", state: false, engName: "" },
//     { name: "소스", state: false, engName: "" },
//     { name: "과일", state: false, engName: "" },
//     { name: "차", state: false, engName: "" },
//   ];

//   const CategoryDrinkList: FilterType[] = [
//     { name: "음료", state: false, engName: "" },
//     { name: "아이스드링크", state: false, engName: "" },
//     { name: "유제품", state: false, engName: "" },
//     { name: "아이스크림", state: false, engName: "" },
//   ];

//   const CategoryLifeList: FilterType[] = [
//     { name: "의학용품", state: false, engName: "" },
//     { name: "생활용품", state: false, engName: "" },
//     { name: "펫용품", state: false, engName: "" },
//     { name: "취미", state: false, engName: "" },
//     { name: "레저", state: false, engName: "" },
//   ];
