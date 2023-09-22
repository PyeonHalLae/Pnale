import { useEffect, useState } from "react";
// import { ingredientState } from "@/recoil/khiRecoil";
// import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const RecipeIngredientModalContent = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [productList, setProductList] = useState<string[]>([]);
  const [selectedProd, setSelectedProd] = useState<string>("");
  //   const [keyword, setKeyword] = useRecoilState(ingredientState);
  useEffect(() => {
    setProductList(["1", "2", "3", "4"]);
  }, []);

  const InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const ItemClickHandler = (selectedProd: string) => {
    setSelectedProd(selectedProd);
  };

  return (
    <>
      <Title>재료 선택하기</Title>
      <SearchBar>
        <img className="w-[1.2rem] h-[1.2rem]" src="/img/btn/search-blue.png" alt="ggg" />
        <input
          className="outline-none bg-common-back-color text-[1.125rem] ml-[0.5rem]"
          value={searchKeyword}
          onChange={InputChangeHandler}
          placeholder="재료 검색"
        />
      </SearchBar>
      <SearchResultBox>
        <CategoryListBox>
          <ListItem selected={true}>전체</ListItem>
        </CategoryListBox>

        <IngredientListBox>
          {productList &&
            productList.map((productItem: string) => (
              <ListItem
                key={productItem}
                selected={productItem == selectedProd}
                onClick={() => {
                  ItemClickHandler(productItem);
                }}
              >
                {productItem}
              </ListItem>
            ))}
        </IngredientListBox>
      </SearchResultBox>
      <BtnBox>
        <ChoiceBtn
          onClick={() => {
            console.log(selectedProd);
          }}
        >
          선택하기
        </ChoiceBtn>
      </BtnBox>
    </>
  );
};

export default RecipeIngredientModalContent;

const Title = tw.div`
ml-[0.875rem]
mt-[1.5rem]
mb-[.75rem]
text-common-text-color
text-[1.5rem]
relative
`;

const SearchBar = tw.div`
flex
w-[calc(100%-1.5rem)]
h-[2.5rem]
mx-[0.75rem]
py-[0.5rem]
pl-[0.5rem]
bg-common-back-color
`;

const SearchResultBox = tw.div`
flex
w-[calc(100%-1.5rem)]
h-[19rem]
border-[1px]
mx-[0.75rem]
mt-[0.75rem]
`;

const CategoryListBox = tw.div`
w-[5rem]
h-[100%]
border-[1px]
overflow-scroll
`;
const IngredientListBox = tw.div`
w-[calc(100%-5rem)]
h-[100%]
border-[1px]
overflow-scroll
`;
const ListItem = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 2rem;
  border-bottom: 0.5px solid #d9d9d9;
  padding: 0.3rem 0;
  box-sizing: border-box;
  background-color: ${(props) => (props.selected ? `#1E2B4F` : `#fffff`)};
  color: ${(props) => (props.selected ? `#ffffff` : `#1E2B4F`)};
  font-size: 1.125rem;
  font-weight: 500;
  text-align: center;
`;

const BtnBox = tw.div`
flex 
justify-center 
w-[100%]
mt-[0.75rem]
mb-[1.25rem]
`;

const ChoiceBtn = tw.div`
justify-center
text-center
w-[8.9375rem]
h-[2.5rem]
rounded-[0.625rem]
py-[.75rem]

bg-common-text-color
text-white
text-[0.9375rem]
`;
