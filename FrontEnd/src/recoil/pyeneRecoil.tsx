import { atom, selector } from "recoil";

export const preProductView = atom<{ type: string }>({
  key: "preProductView",
  default: { type: "EVENT" },
});

export interface FilterType {
  name: string;
  state: boolean;
  engName: string;
}

export const SortFilterDefault = atom<number>({
  key: "SortFilterDefault",
  default: 0,
});

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

export const CategoryMealDefault = atom<{ data: FilterType[] }>({
  key: "CategoryMealDefault",
  default: {
    data: [
      { name: "도시락", state: false, engName: "" },
      { name: "샌드위치", state: false, engName: "" },
      { name: "햄버거", state: false, engName: "" },
      { name: "주먹밥", state: false, engName: "" },
      { name: "김밥", state: false, engName: "" },
    ],
  },
});

export const CategoryCookDefault = atom<{ data: FilterType[] }>({
  key: "CategoryCookDefault",
  default: {
    data: [
      { name: "즉석튀김", state: false, engName: "" },
      { name: "즉석베이커리", state: false, engName: "" },
      { name: "즉석커피", state: false, engName: "" },
      { name: "즉석식품", state: false, engName: "" },
    ],
  },
});

export const CategorySnackDefault = atom<{ data: FilterType[] }>({
  key: "CategorySnackDefault",
  default: {
    data: [
      { name: "스낵", state: false, engName: "" },
      { name: "비스캣", state: false, engName: "" },
      { name: "빵", state: false, engName: "" },
      { name: "디저트", state: false, engName: "" },
      { name: "캔디", state: false, engName: "" },
      { name: "초콜릿", state: false, engName: "" },
      { name: "껌", state: false, engName: "" },
      { name: "젤리", state: false, engName: "" },
    ],
  },
});

export const CategoryFoodDefault = atom<{ data: FilterType[] }>({
  key: "CategoryFoodDefault",
  default: {
    data: [
      { name: "가공식품", state: false, engName: "" },
      { name: "안주류", state: false, engName: "" },
      { name: "식재료", state: false, engName: "" },
      { name: "밀키트", state: false, engName: "" },
      { name: "조미료", state: false, engName: "" },
      { name: "소스", state: false, engName: "" },
      { name: "과일", state: false, engName: "" },
      { name: "차", state: false, engName: "" },
    ],
  },
});

export const CategoryDrinkDefault = atom<{ data: FilterType[] }>({
  key: "CategoryDrinkDefault",
  default: {
    data: [
      { name: "음료", state: false, engName: "" },
      { name: "아이스드링크", state: false, engName: "" },
      { name: "유제품", state: false, engName: "" },
      { name: "아이스크림", state: false, engName: "" },
    ],
  },
});

export const CategoryLifeDefault = atom<{ data: FilterType[] }>({
  key: "CategoryLifeDefault",
  default: {
    data: [
      { name: "의학용품", state: false, engName: "" },
      { name: "생활용품", state: false, engName: "" },
      { name: "펫용품", state: false, engName: "" },
      { name: "취미", state: false, engName: "" },
      { name: "레저", state: false, engName: "" },
    ],
  },
});

export const AllEventDefault = atom<boolean>({
  key: "AllEventDefault",
  default: true,
});

export const AllCategoryDefault = atom<boolean>({
  key: "AllCategoryDefault",
  default: true,
});

export interface FilterInfoType {
  sort: number;
  event: string[] | null;
  category: string[] | null;
}

export const FilterInfo = selector({
  key: "FilterInfo",
  get: ({ get }) => {
    const sortFilter = get(SortFilterDefault);
    const eventFilter = get(EventFilterDefault).data;
    const categoryFilter = [
      get(CategoryMealDefault).data,
      get(CategoryCookDefault).data,
      get(CategorySnackDefault).data,
      get(CategoryFoodDefault).data,
      get(CategoryDrinkDefault).data,
      get(CategoryLifeDefault).data,
    ];

    const eventTrueFilter = eventFilter.filter((item) => item.state).map((item) => item.engName);
    const categoryTrueFilter = categoryFilter.flatMap((category) =>
      category.filter((item) => item.state).map((item) => item.name)
    );

    const Filter: FilterInfoType = {
      sort: sortFilter,
      event: eventTrueFilter.length != 0 ? [...eventTrueFilter] : null,
      category: categoryTrueFilter.length != 0 ? [...categoryTrueFilter] : null,
    };

    return Filter;
  },
});

export const FilterCnt = selector({
  key: "FilterCnt",
  get: ({ get }) => {
    const eventFilter = get(EventFilterDefault).data;
    const categoryFilter = [
      get(CategoryMealDefault).data,
      get(CategoryCookDefault).data,
      get(CategorySnackDefault).data,
      get(CategoryFoodDefault).data,
      get(CategoryDrinkDefault).data,
      get(CategoryLifeDefault).data,
    ];

    let eventTrueCnt: number = 0;
    let categoryTrueCnt: number = 0;
    eventFilter.filter((event) => {
      if (event.state) eventTrueCnt += 1;
    });
    categoryFilter.filter((category) => {
      category.forEach((itme) => {
        if (itme.state) categoryTrueCnt += 1;
      });
    });

    return eventTrueCnt + categoryTrueCnt;
  },
});
