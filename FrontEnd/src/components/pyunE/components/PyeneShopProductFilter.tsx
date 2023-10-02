// import React from 'react'

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import * as pyeneRecoil from "@/recoil/pyeneRecoil";
import { useRecoilState } from "recoil";

interface ModalHandlerProps {
  ModalHandler: () => void;
}

interface FilterType {
  name: string;
  state: boolean;
  engName: string;
}

const SortFilterList = [{ name: "이름순" }, { name: "가격낮은순" }, { name: "가격높은순" }];

const PyeneShopProductFilter = ({ ModalHandler }: ModalHandlerProps) => {
  //recoil defult 받아오기 경우
  const [sortDefault, setSortDefault] = useRecoilState(pyeneRecoil.SortFilterDefault);
  const [eventDefault, setEventDefault] = useRecoilState(pyeneRecoil.EventFilterDefault);
  const [mealDefault, setMealDefault] = useRecoilState(pyeneRecoil.CategoryMealDefault);
  const [cookDefault, setCookDefault] = useRecoilState(pyeneRecoil.CategoryCookDefault);
  const [snackDefault, setSnackDefault] = useRecoilState(pyeneRecoil.CategorySnackDefault);
  const [foodDefault, setFoodDefault] = useRecoilState(pyeneRecoil.CategoryFoodDefault);
  const [drinkDefault, setDrinkDefault] = useRecoilState(pyeneRecoil.CategoryDrinkDefault);
  const [lifeDefault, setLifeDefault] = useRecoilState(pyeneRecoil.CategoryLifeDefault);
  const [eventAllDefault, setEventAllDefault] = useRecoilState(pyeneRecoil.AllEventDefault);
  const [categoryAllDefault, setCategoryAllDefault] = useRecoilState(
    pyeneRecoil.AllCategoryDefault
  );

  //복제
  const [eventFilter, setEventFilter] = useState<FilterType[]>(eventDefault.data);
  const [mealFilter, setMealFilter] = useState<FilterType[]>(mealDefault.data);
  const [cookFilter, setCookFilter] = useState<FilterType[]>(cookDefault.data);
  const [snackFilter, setSnackFilter] = useState<FilterType[]>(snackDefault.data);
  const [foodFilter, setFoodFilter] = useState<FilterType[]>(foodDefault.data);
  const [drinkFilter, setDrinkFilter] = useState<FilterType[]>(drinkDefault.data);
  const [lifeFilter, setLifeFilter] = useState<FilterType[]>(lifeDefault.data);

  //정렬 관련
  const [sortIndex, setSortIndex] = useState<number>(sortDefault);

  //전체 선택 초기화 등
  const [eventAllFilter, setEventAllFilter] = useState<boolean>(eventAllDefault);
  const [categoryAllFilter, setCategoryAllFilter] = useState<boolean>(categoryAllDefault);

  useEffect(() => {
    setSortDefault(sortDefault);
    setEventFilter(eventDefault.data);
    setMealFilter(mealDefault.data);
    setCookFilter(cookDefault.data);
    setSnackFilter(snackDefault.data);
    setFoodFilter(foodDefault.data);
    setDrinkFilter(drinkDefault.data);
    setLifeFilter(lifeDefault.data);
    setEventAllFilter(eventAllDefault);
    setCategoryAllFilter(categoryAllDefault);
  }, []);

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
    updateEventFilter[index] = { ...value, state: !value.state };
    setEventFilter(updateEventFilter);
  };

  const MealIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateMealFilter = [...mealFilter];
    updateMealFilter[index] = { ...value, state: !value.state };
    setMealFilter(updateMealFilter);
  };

  const CookIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateCookFilter = [...cookFilter];
    updateCookFilter[index] = { ...value, state: !value.state };
    setCookFilter(updateCookFilter);
  };

  const SnackIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateSnackFilter = [...snackFilter];
    updateSnackFilter[index] = { ...value, state: !value.state };
    setSnackFilter(updateSnackFilter);
  };

  const FoodIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateFoodFilter = [...foodFilter];
    updateFoodFilter[index] = { ...value, state: !value.state };
    setFoodFilter(updateFoodFilter);
  };

  const DrinkIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateDrinkFilter = [...drinkFilter];
    updateDrinkFilter[index] = { ...value, state: !value.state };
    setDrinkFilter(updateDrinkFilter);
  };

  const LifeIndexHandler = (value: FilterType, index: number) => {
    if (categoryAllFilter) setCategoryAllFilter(false);
    const updateLifeFilter = [...lifeFilter];
    updateLifeFilter[index] = { ...value, state: !value.state };
    setLifeFilter(updateLifeFilter);
  };

  const AllEventHandler = async () => {
    setEventAllFilter(true);
    const updateEventFilter = await eventFilter.map((filter) => ({ ...filter, state: false }));
    setEventFilter(updateEventFilter);
  };

  const AllCategoryHandler = async () => {
    setCategoryAllFilter(true);
    const updateMealFilter = await mealFilter.map((filter) => ({ ...filter, state: false }));
    const updateCookFilter = await cookFilter.map((filter) => ({ ...filter, state: false }));
    const updateSnackFilter = await snackFilter.map((filter) => ({ ...filter, state: false }));
    const updateFoodFilter = await foodFilter.map((filter) => ({ ...filter, state: false }));
    const updateDrinkFilter = await drinkFilter.map((filter) => ({ ...filter, state: false }));
    const updateLifeFilter = await lifeFilter.map((filter) => ({ ...filter, state: false }));
    setMealFilter(updateMealFilter);
    setCookFilter(updateCookFilter);
    setSnackFilter(updateSnackFilter);
    setFoodFilter(updateFoodFilter);
    setDrinkFilter(updateDrinkFilter);
    setLifeFilter(updateLifeFilter);
  };

  const ResetFilterHandler = async () => {
    setSortIndex(0);
    await AllEventHandler();
    await AllCategoryHandler();
  };

  const SaveFilterHandler = () => {
    setCategoryAllDefault(categoryAllFilter);
    setEventAllDefault(eventAllFilter);
    setSortDefault(sortIndex);
    setEventDefault({ data: eventFilter });
    setMealDefault({ data: mealFilter });
    setCookDefault({ data: cookFilter });
    setSnackDefault({ data: snackFilter });
    setFoodDefault({ data: foodFilter });
    setDrinkDefault({ data: drinkFilter });
    setLifeDefault({ data: lifeFilter });
    ModalHandler();
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
              <div className="flex">
                <SideTitle>정렬</SideTitle>
                <SideInfo>기본값 : 이름순</SideInfo>
              </div>
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
              <div className="flex">
                <SideTitle>행사선택</SideTitle>
                <SideInfo>기본값 : 전체</SideInfo>
              </div>
              <AllMain onClick={AllEventHandler}>
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
              <div className="flex">
                <SideTitle>카테고리</SideTitle>
                <SideInfo>기본값 : 전체</SideInfo>
              </div>
              <AllMain onClick={AllCategoryHandler}>
                <div className={categoryAllFilter ? "active" : ""}>전체</div>
              </AllMain>
            </SideHeader>
            <SideMain>
              <SideCategory>간편 식사</SideCategory>
              {mealFilter.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => MealIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>즉석 조리</SideCategory>
              {cookFilter.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => CookIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>과자류</SideCategory>
              {snackFilter.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => SnackIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>식품</SideCategory>
              {foodFilter.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => FoodIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>음료/아이스크림</SideCategory>
              {drinkFilter.map((value, index) => (
                <div
                  key={value.name + index}
                  className={value.state ? "active" : ""}
                  onClick={() => DrinkIndexHandler(value, index)}
                >
                  {value.name}
                </div>
              ))}
              <SideCategory>생활용품</SideCategory>
              {lifeFilter.map((value, index) => (
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
          <ClearBtn onClick={() => ResetFilterHandler()}>초기화</ClearBtn>
          <ApplyBtn onClick={() => SaveFilterHandler()}>적용하기</ApplyBtn>
        </FilterSaveBox>
      </FilterBox>
    </>
  );
};

export default PyeneShopProductFilter;

const BackSide = tw.div`
  fixed
  bg-[rgba(51,51,51,0.8)]
  min-w-[350px]
  max-w-[450px]
  w-full
  h-full
  top-0
  z-40
`;

const FilterBox = tw.div`
  fixed
  bg-white
  w-full
  min-w-[350px]
  max-w-[450px]
  h-[85%]
  bottom-[0px]
  rounded-[15px_15px_0px_0px]
  z-50
  overflow-y-scroll
  transition: transform 0.3s ease-in-out; /* translateY 애니메이션 추가 */
  transform: translateY(100%); /* 초기 위치 설정 (아래에서 위로 올라오는 애니메이션을 위해 100%로 설정) */
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
  z-20
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

const FilterMainBox = tw.div`mt-[52px] overflow-scroll h-[calc(85%-45px)]`;

const SortBox = tw.div`mt-3 ml-[22px]`;

const SideHeader = tw.div`flex text-common-text-color my-3 justify-between`;

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
  h-[90px]
  bottom-0
  border-common-white-divider
  border-t-[1px]
  bg-white
  flex
  justify-center
`;

const ClearBtn = tw.div`
  w-[85px]
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
