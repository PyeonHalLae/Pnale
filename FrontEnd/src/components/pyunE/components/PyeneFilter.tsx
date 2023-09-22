// import React from 'react'

import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { preProductView, EventFilterDefault } from "@/recoil/pyeneRecoil";
import { useRecoilState, useResetRecoilState } from "recoil";

interface ModalHandlerProps {
  ModalHandler: () => void;
}

interface FilterType {
  name: string;
  state: boolean;
  engName: string;
}

const SortFilterList = [{ name: "이름순" }, { name: "가격낮은순" }, { name: "가격높은순" }];

const CategoryMealList: FilterType[] = [
  { name: "도시락", state: false, engName: "" },
  { name: "샌드위치", state: false, engName: "" },
  { name: "햄버거", state: false, engName: "" },
  { name: "주먹밥", state: false, engName: "" },
  { name: "김밥", state: false, engName: "" },
];

const CategoryCookList: FilterType[] = [
  { name: "즉석튀김", state: false, engName: "" },
  { name: "즉석베이커리", state: false, engName: "" },
  { name: "즉석커피", state: false, engName: "" },
  { name: "즉석식품", state: false, engName: "" },
];

const CategorySnackList: FilterType[] = [
  { name: "스낵", state: false, engName: "" },
  { name: "비스캣", state: false, engName: "" },
  { name: "빵", state: false, engName: "" },
  { name: "디저트", state: false, engName: "" },
  { name: "캔디", state: false, engName: "" },
  { name: "초콜릿", state: false, engName: "" },
  { name: "껌", state: false, engName: "" },
  { name: "젤리", state: false, engName: "" },
];

const CategoryFoodList: FilterType[] = [
  { name: "가공식품", state: false, engName: "" },
  { name: "안주류", state: false, engName: "" },
  { name: "식재료", state: false, engName: "" },
  { name: "밀키트", state: false, engName: "" },
  { name: "조미료", state: false, engName: "" },
  { name: "소스", state: false, engName: "" },
  { name: "과일", state: false, engName: "" },
  { name: "차", state: false, engName: "" },
];

const CategoryDrinkList: FilterType[] = [
  { name: "음료", state: false, engName: "" },
  { name: "아이스드링크", state: false, engName: "" },
  { name: "유제품", state: false, engName: "" },
  { name: "아이스크림", state: false, engName: "" },
];

const CategoryLifeList: FilterType[] = [
  { name: "의학용품", state: false, engName: "" },
  { name: "생활용품", state: false, engName: "" },
  { name: "펫용품", state: false, engName: "" },
  { name: "취미", state: false, engName: "" },
  { name: "레저", state: false, engName: "" },
];

const PyeneFilter = ({
  ModalHandler,
  $productListType,
}: ModalHandlerProps & { $productListType: string }) => {
  //recoil 사용 선언부
  const [preProductViewType, setPreProductViewType] = useRecoilState(preProductView);

  //defult 값만 받아오는 경우
  const [eventDefault, setEventDefault] = useRecoilState(EventFilterDefault);
  //복제..
  const [eventFilter, setEventFilter] = useState<FilterType[]>([...eventDefault.data]);

  //recoil default로 리셋
  const eventClear = useResetRecoilState(EventFilterDefault);

  const [sortIndex, setSortIndex] = useState<number>(0);

  const [mealFilter, setMealFilter] = useState<FilterType[]>(CategoryMealList);
  const [cookFilter, setCookFilter] = useState<FilterType[]>(CategoryCookList);
  const [snackFilter, setSnackFilter] = useState<FilterType[]>(CategorySnackList);
  const [foodFilter, setFoodFilter] = useState<FilterType[]>(CategoryFoodList);
  const [drinkFilter, setDrinkFilter] = useState<FilterType[]>(CategoryDrinkList);
  const [lifeFilter, setLifeFilter] = useState<FilterType[]>(CategoryLifeList);

  const [eventAllFilter, setEventAllFilter] = useState<boolean>(true);
  const [categoryAllFilter, setCategoryAllFilter] = useState<boolean>(true);

  const prveProductListType = useRef<string>($productListType);

  useEffect(() => {
    console.log("여기 필터야!");
    console.log(prveProductListType.current);
    console.log($productListType);
    if (preProductViewType.type !== $productListType) {
      setPreProductViewType({ type: $productListType });
      console.log("변경 인식");
      setSortIndex(0);

      eventClear();
      setMealFilter(CategoryMealList);
      setCookFilter(CategoryCookList);
      setSnackFilter(CategorySnackList);
      setFoodFilter(CategoryFoodList);
      setDrinkFilter(CategoryDrinkList);
      setLifeFilter(CategoryLifeList);
    }
  }, [$productListType]);

  const sortIndexHandler = useCallback(
    (index: number) => {
      if (sortIndex === index) {
        setSortIndex(null); // 이미 활성화된 항목을 다시 클릭하면 비활성화
      } else {
        setSortIndex(index); // 그 외의 경우, 해당 항목을 활성화
      }
    },
    [sortIndex]
  );

  const EventIndexHandler = (value: FilterType, index: number) => {
    if (eventAllFilter) setEventAllFilter(false);
    const updateEventFilter = [...eventFilter];
    // console.log(index);
    // console.log(value.state);
    // console.log(updateEventFilter);
    // console.log(updateEventFilter[index]);
    updateEventFilter[index].state = !value.state;
    setEventFilter(updateEventFilter);
  };

  const MealIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateMealFilter = [...mealFilter];
    updateMealFilter[index].state = !value.state;
    setMealFilter(updateMealFilter);
  };

  const CookIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateCookFilter = [...cookFilter];
    updateCookFilter[index].state = !value.state;
    setCookFilter(updateCookFilter);
  };

  const SnackIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateSnackFilter = [...snackFilter];
    updateSnackFilter[index].state = !value.state;
    setSnackFilter(updateSnackFilter);
  };

  const FoodIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateFoodFilter = [...foodFilter];
    updateFoodFilter[index].state = !value.state;
    setFoodFilter(updateFoodFilter);
  };

  const DrinkIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateDrinkFilter = [...drinkFilter];
    updateDrinkFilter[index].state = !value.state;
    setDrinkFilter(updateDrinkFilter);
  };

  const LifeIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateLifeFilter = [...lifeFilter];
    updateLifeFilter[index].state = !value.state;
    setLifeFilter(updateLifeFilter);
  };

  return (
    <>
      <BackSide onClick={ModalHandler} />
      <FilterBox>
        <TitleBox>
          <Title>필터 선택</Title>
          <CloseBtn src="/img/btn/close-btn.png" onClick={ModalHandler} />
        </TitleBox>
        <FilterMainBox>
          <SortBox>
            <SideHeader>
              <SideTitle>정렬</SideTitle>
              <SideInfo>기본값 : 이름순</SideInfo>
            </SideHeader>
            <SideMain>
              {SortFilterList.map((value, index) => (
                <div
                  key={value.name + index}
                  className={sortIndex === index ? "active" : ""}
                  onClick={() => sortIndexHandler(index)}
                >
                  {value.name}
                </div>
              ))}
            </SideMain>
          </SortBox>
          <EventBox>
            <SideHeader>
              <SideTitle>행사선택</SideTitle>
              <SideInfo>기본값 : 전체</SideInfo>
              <AllMain>
                <div className={eventAllFilter ? "active" : ""}>전체</div>
              </AllMain>
            </SideHeader>
            <SideMain>
              {eventFilter.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => {
                    EventIndexHandler(value, index);
                  }}
                >
                  {value.name}
                </div>
              ))}
            </SideMain>
          </EventBox>
          <CategoryBox>
            <SideHeader>
              <SideTitle>카테고리</SideTitle>
              <SideInfo>기본값 : 전체</SideInfo>
              <AllMain>
                <div className={categoryAllFilter ? "active" : ""}>전체</div>
              </AllMain>
            </SideHeader>
            <SideMain>
              <SideCategory>간편 식사</SideCategory>
              {CategoryMealList.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => MealIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>즉석 조리</SideCategory>
              {CategoryCookList.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => CookIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>과자류</SideCategory>
              {CategorySnackList.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => SnackIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>식품</SideCategory>
              {CategoryFoodList.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => FoodIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>음료/아이스크림</SideCategory>
              {CategoryDrinkList.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => DrinkIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>생활용품</SideCategory>
              {CategoryLifeList.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => LifeIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
            </SideMain>
          </CategoryBox>
        </FilterMainBox>
        <FilterSaveBox>
          <ClearBtn>초기화</ClearBtn>
          <ApplyBtn>적용하기</ApplyBtn>
        </FilterSaveBox>
      </FilterBox>
    </>
  );
};

export default PyeneFilter;

const BackSide = tw.div`
  fixed
  bg-[rgba(51,51,51,0.8)]
  min-w-[350xp]
  max-w-[450px]
  w-full
  h-full
  top-0
  z-20
`;

const FilterBox = tw.div`
  fixed
  bg-white
  w-full
  min-w-[350xp]
  max-w-[450px]
  h-[80%]
  bottom-0
  rounded-[15px_15px_0px_0px]
  z-30
  overflow-y-scroll
`;

const TitleBox = tw.div`
  fixed
  w-full
  bg-white
  h-[52px]
  border-b-2
  min-w-[350xp]
  max-w-[450px]
  border-common-white-divider
  rounded-[15px_15px_0px_0px]
  flex
  z-30
`;

const Title = tw.div`
  text-[22px]
  my-auto
  text-common-text-color
  font-bold
  h-[25px]
  ml-[20px]
`;

const CloseBtn = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  right: 10px;
  top: 8px;
`;

const FilterMainBox = tw.div`mt-[70px] mb-[20px]`;

const SortBox = tw.div`mt-3 ml-[22px]`;

const SideHeader = tw.div`flex text-common-text-color my-3`;

const SideTitle = tw.div`text-[20px] font-bold mr-[6px]`;

const SideInfo = tw.div`text-[11px] pt-[10.5px]`;

const SideMain = styled.div`
  width: calc(100% - 22px);
  height: auto;
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  margin-bottom: 30px;
  div {
    font-size: 13px;
    padding: 5px 15px;
    background-color: #aeb0b6;
    margin-right: 10px;
    color: white;
    border-radius: 25px;
    height: 28px;
    display: flex;
    text-align: center;
  }
  div.active {
    background-color: #1e2b4f;
  }
`;

const EventBox = tw.div`mt-3 ml-[22px]`;

const CategoryBox = tw.div`mt-3 ml-[22px]`;

const SideCategory = tw.p`text-[12px] text-common-bold-back-color w-full border-common-white-divider border-b-[1px]`;

const FilterSaveBox = tw.div`
  sticky
  w-full
  h-[75px]
  bottom-0
  border-common-white-divider
  border-t-[1px]
  bg-white
  flex
  justify-center
`;

const ClearBtn = tw.div`
  w-[90px]
  h-[45px]
  border-common-text-color
  border-[1px]
  rounded-[10px]
  text-common-text-color
  text-[18px]
  font-bold
  text-center
  py-[10px]
  mr-4
  mt-4
`;

const ApplyBtn = tw.div`
  w-[150px]
  h-[45px]
  border-common-text-color
  border-[1px]
  rounded-[10px]
  bg-common-text-color
  text-[18px]
  text-white
  font-bold
  text-center
  py-[10px]
  ml-4
  mt-4
`;

const AllMain = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  z-index: 10;
  div {
    font-size: 13px;
    padding: 5px 15px;
    background-color: #aeb0b6;
    margin-right: 10px;
    color: white;
    border-radius: 25px;
    height: 28px;
    display: flex;
    text-align: center;
  }
  div.active {
    background-color: #1e2b4f;
  }
`;
