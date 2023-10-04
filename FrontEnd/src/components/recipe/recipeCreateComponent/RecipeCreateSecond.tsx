import { Dispatch, SetStateAction, useState } from "react";
import tw from "tailwind-styled-components";
import { productFormType } from "./../recipeCommonComponent/recipeFormType";
import CancelBtn from "./CancelBtn";
import RecipeCommonModal from "./../recipeCommonComponent/RecipeCommonModal";
import RecipeProductsAddModalContent from "./RecipeProductsAddModalContent";
import { recipeFormProduct } from "@/recoil/khiRecoil";
import { useRecoilState } from "recoil";

interface Props {
  stepHandler: Dispatch<SetStateAction<string>>;
  action: string;
}

const RecipeCreateSecond = ({ stepHandler, action }: Props) => {
  const [products, setProducts] = useRecoilState(recipeFormProduct);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const productDeleteHandler = (deleteId: number) => {
    const newProducts = products.filter((product) => product.prdId !== deleteId);
    setProducts(newProducts);
  };
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProducts = products.map((product) => {
      return product.prdName === e.target.value
        ? { ...product, changeable: !product.changeable }
        : product;
    });
    setProducts(newProducts);
  };

  return (
    <Container>
      <CancelBtn action={action} />
      <ProductsBox>
        {isModalActive && (
          <RecipeCommonModal
            setModal={setIsModalActive}
            width="22"
            height="36"
            element={<RecipeProductsAddModalContent setModal={setIsModalActive} />}
          />
        )}
        <ProductBoxTitle>
          재료 등록<span className="text-common-orange">*</span>
        </ProductBoxTitle>
        <ProductTableColName>
          <div className="w-[calc(100%-5rem)] flex justify-center items-center">
            <div>재료명</div>
          </div>
          <div className="w-[5rem] flex justify-center items-center">
            <div>변경가능</div>
          </div>
        </ProductTableColName>
        {products.map((product: productFormType, index: number) => {
          return (
            <ProductItem key={index}>
              <ProductNameBox>
                <div className="w-[4rem] text-center">{index + 1}</div>
                <div className="w-[calc(100%-2rem)] h-[1.5rem] border-b-2 px-[0.5rem] line-clamp-1">
                  {product.prdName}
                </div>
              </ProductNameBox>
              <ProductChangeBox>
                <input
                  className="inline-block"
                  checked={product.changeable}
                  value={product.prdName}
                  type="checkbox"
                  onChange={checkHandler}
                ></input>
              </ProductChangeBox>
              <div className="absolute right-[-1rem] h-[100%] flex flex-row-reverse items-center">
                <img
                  className="w-[1.5rem] border"
                  src="/img/btn/close-btn.png"
                  onClick={() => {
                    productDeleteHandler(product.prdId);
                  }}
                />
              </div>
            </ProductItem>
          );
        })}

        <ProductAddBtn
          onClick={() => {
            setIsModalActive(true);
          }}
        >
          + 재료 추가하기
        </ProductAddBtn>
      </ProductsBox>

      <BtnBox>
        <WhiteBtn
          onClick={() => {
            stepHandler("1");
          }}
        >
          이전으로
        </WhiteBtn>
        <BlueBtn
          onClick={() => {
            stepHandler("3");
          }}
        >
          다음으로
        </BlueBtn>
      </BtnBox>
    </Container>
  );
};

export default RecipeCreateSecond;

const Container = tw.div`
relative
px-[2.5rem]
w-[100%]
`;

const ProductsBox = tw.div`
w-[100%]
h-[31.25rem]
bg-white
my-[3rem]
shadow
`;

const ProductBoxTitle = tw.div`
text-[1.5625rem]
text-common-text-color
py-[1.25rem]
text-center
`;

const ProductTableColName = tw.div`
w-[calc(100%-3rem)]
h-[2rem]
flex
text-[0.9375rem];
text-common-text-color
font-bold
mx-[1.5rem]
mb-[.625rem]
border-b-2
`;

const ProductItem = tw.div`
relative
w-[calc(100%-3rem)]
h-[2rem]
flex
my-[1rem]
mx-[1.5rem]
`;

const ProductNameBox = tw.div`
w-[calc(100%-5rem)] 
flex 
items-center
`;
const ProductChangeBox = tw.div`
w-[5rem] flex justify-center items-center
`;

const ProductAddBtn = tw.div`
mt-[2rem]
text-[0.9375rem];
text-common-text-color
py-[1rem];
text-center
`;

const BtnBox = tw.div`
flex
w-[100%]
relative
itmes-center
justify-between
`;

const BlueBtn = tw.div`
justify-center
text-center
w-[8.9375rem]
h-[2.5rem]
rounded-[0.625rem]
py-[.75rem]

bg-common-text-color
text-white
text-[0.9375rem]
shadow
`;

const WhiteBtn = tw.div`
justify-center
text-center
w-[8.9375rem]
h-[2.5rem]
rounded-[0.625rem]
py-[.75rem]

bg-white
text-common-text-color
text-[0.9375rem]
shadow
`;
