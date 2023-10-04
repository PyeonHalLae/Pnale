import { Dispatch, SetStateAction, useState } from "react";
// import { ingredientState } from "@/recoil/khiRecoil";
// import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { recipePrdInfoType } from "./recipeDetailType";
import axios from "axios";

interface searchPrdInfoType {
  id: number;
  name: string;
  category: string;
}

const RecipeProductsModalContent = ({
  index,
  setBoxIngredients,
}: {
  index: number;
  setBoxIngredients: Dispatch<SetStateAction<recipePrdInfoType[]>>;
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [productList, setProductList] = useState<searchPrdInfoType[]>([]);
  const [selectedProd, setSelectedProd] = useState<searchPrdInfoType>({
    id: -1,
    name: "",
    category: "",
  });

  const searchBarEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      productSearchHandler();
    }
  };
  const InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const ItemClickHandler = (selectedProd: searchPrdInfoType) => {
    setSelectedProd(selectedProd);
  };

  const productSearchHandler = () => {
    const data = {
      name: searchKeyword,
    };
    axios
      .post("/api/search", data)
      .then((res) => {
        console.log(res);
        setProductList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const choiceHandler = () => {
    axios
      .post("/api/search/result", {
        ids: [selectedProd.id],
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          const newItem = {
            prdId: res.data.data.search.content[0].product.productId,
            prdName: res.data.data.search.content[0].product.productName,
            price: res.data.data.search.content[0].product.price,
            changeable: true,

            cuprice: null,
            cutype: res.data.data.search.content[0].event.cutype,

            gsprice: null,
            gstype: res.data.data.search.content[0].event.gstype,

            sevenprice: null,
            seventype: res.data.data.search.content[0].event.seventype,

            emartprice: null,
            emarttype: res.data.data.search.content[0].event.emarttype,
          };

          setBoxIngredients((prev) => {
            return prev.map((item, i) => {
              if (i === index) {
                return newItem;
              } else {
                return item;
              }
            });
          });
        }
      })
      .catch();
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
          onKeyDown={searchBarEnterHandler}
          placeholder="재료 검색"
        />
        <div
          className="w-[3rem] py-1 mr-2 font-light bg-common-text-color text-[0.8rem] text-center text-white rounded-[0.5rem]"
          onClick={productSearchHandler}
        >
          검색
        </div>
      </SearchBar>
      <SearchResultBox>
        <CategoryListBox>
          <ListItem selected={true}>전체</ListItem>
        </CategoryListBox>

        <ProductsListBox>
          {productList &&
            productList.map((productItem: searchPrdInfoType) => (
              <ListItem
                key={productItem.id}
                selected={productItem == selectedProd}
                onClick={() => {
                  ItemClickHandler(productItem);
                }}
              >
                {productItem.name}
              </ListItem>
            ))}
        </ProductsListBox>
      </SearchResultBox>
      <BtnBox>
        <ChoiceBtn onClick={choiceHandler}>선택하기</ChoiceBtn>
      </BtnBox>
    </>
  );
};

export default RecipeProductsModalContent;

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
const ProductsListBox = tw.div`
w-[calc(100%-5rem)]
h-[100%]
border-[1px]
overflow-scroll
`;
const ListItem = styled.div<{ selected: boolean }>`
  width: 100%;
  min-height: 2rem;
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
