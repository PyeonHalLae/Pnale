import { Dispatch, SetStateAction, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
// import { productFormType } from "../recipeCommonComponent/recipeFormType";
import { recipeProductsState } from "@/recoil/khiRecoil";
import { useRecoilState } from "recoil";
import axios from "axios";

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}

interface ProductInfoType {
  id: number;
  name: string;
  category: string;
}

const RecipeProductsAddModalContent = ({ setModal }: Props) => {
  const disableModal = () => {
    setModal(false);
  };
  const [products, setProducts] = useRecoilState(recipeProductsState);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [productList, setProductList] = useState<ProductInfoType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedProd, setSelectedProd] = useState<ProductInfoType>({
    id: 0,
    name: "",
    category: "",
  });

  const categoryList = [
    "가공식품",
    "안주류",
    "식재료",
    "가공식사",
    "음료",
    "소스",
    "밀키트",
    "도시락",
    "샌드위치",
    "햄버거",
    "주먹밥",
    "김밥",

    "스낵",
    "비스켓",
    "빵",
    "디저트",
    "껌",
    "초콜릿",
    "캔디",

    "아이스크림",
    "과일",

    "아이스 드링크",
    "유제품",

    "조미료",
    "젤리",

    "펫용품",
    "차",
    "즉석 튀김",
    "즉석 베이커리",
    "즉석 커피",
    "취미",
    "레져",
    "의약용품",
    "생활용품",
  ];

  const productSearchHandler = () => {
    if (selectedCategory == "전체") {
      const data = {
        name: searchKeyword,
      };
      axios
        .post("/api/search", data)
        .then((res) => {
          setProductList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = {
        name: searchKeyword,
        category: selectedCategory,
      };
      axios
        .post("/api/search/recipe", data)
        .then((res) => {
          setProductList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const searchBarEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      productSearchHandler();
    }
  };

  //   const [keyword, setKeyword] = useRecoilState(ingredientState);
  useEffect(() => {
    setProductList([]);
  }, []);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const itemClickHandler = (prod: ProductInfoType) => {
    setSelectedProd(() => {
      return prod;
    });
  };

  return (
    <>
      <Title>재료 선택하기</Title>
      <SearchBar>
        <img className="w-[1.2rem] h-[1.2rem]" src="/img/btn/search-blue.png" alt="ggg" />
        <input
          className="outline-none bg-common-back-color text-[1.125rem] ml-[0.5rem]"
          value={searchKeyword}
          onChange={inputChangeHandler}
          onKeyDown={searchBarEnterHandler}
          placeholder="제품이름을 입력하세요"
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
          <SelctedListItem>{selectedCategory}</SelctedListItem>
          <ListItem
            selected={selectedCategory == "전체" ? true : false}
            onClick={() => {
              setSelectedCategory("전체");
            }}
          >
            전체
          </ListItem>
          {categoryList.map((categoryItem: string, index: number) => {
            return (
              <ListItem
                key={index}
                onClick={() => {
                  setSelectedCategory(categoryItem);
                }}
                selected={selectedCategory == categoryItem ? true : false}
              >
                {categoryItem}
              </ListItem>
            );
          })}
        </CategoryListBox>

        <ProductsListBox>
          {productList &&
            productList.map((productItem: ProductInfoType) => (
              <ListItem
                key={productItem.id}
                selected={productItem.name == selectedProd.name}
                onClick={() => {
                  itemClickHandler(productItem);
                }}
              >
                {productItem.name}
              </ListItem>
            ))}
        </ProductsListBox>
      </SearchResultBox>
      <BtnBox>
        <ChoiceBtn
          onClick={() => {
            setProducts([
              ...products,
              { productId: selectedProd.id, productName: selectedProd.name, isChangeable: false },
            ]);
            disableModal();
          }}
        >
          선택하기
        </ChoiceBtn>
      </BtnBox>
    </>
  );
};

export default RecipeProductsAddModalContent;

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
relative
w-[5rem]
h-[100%]
border-[1px]
overflow-auto
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

const SelctedListItem = styled.div`
  width: 100%;
  min-height: 2rem;
  border-bottom: 0.5px solid #d9d9d9;
  padding: 0.3rem 0;
  box-sizing: border-box;
  background-color: #1e2b4f;
  color: #ffffff;
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
