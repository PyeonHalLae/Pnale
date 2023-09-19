import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "@/components/mypage/mypage2/ProductCard";
import { useState } from "react";
import ProductHelp from "@/components/mypage/mypage2/ProductHelp";

const MyProduct = () => {
  const navigate = useNavigate();

  const [helpState, setHelpState] = useState<boolean>(false);

  const helpStateHandler = () => {
    setHelpState((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {helpState && (
        <ProductHelp
          helpStateHandler={() => {
            helpStateHandler();
          }}
        />
      )}
      <MyProductHeader>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="pt-[85px] pl-[15px]">
          <Title>관심 상품</Title>
          <HelpBtn
            onClick={() => {
              helpStateHandler();
            }}
          />
        </div>
      </MyProductHeader>
      <ProductInfos>
        <ProductInfo />
        <ProductInfo />
        <ProductInfo />
        <ProductInfo />
      </ProductInfos>
    </>
  );
};

export default MyProduct;

const MyProductHeader = styled.div`
  background-color: white;
  height: 8.125rem;
  position: sticky;
  top: 0rem;
`;

const BackBtn = styled.div`
  float: left;
  width: 0.6875rem;
  height: 1.3125rem;
  margin-left: 1.25rem;
  margin-top: 1.875rem;
  background-image: url("/img/btn/left-btn.png");
  background-size: 0.6875rem 1.3125rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 1.875rem;
  height: 2.5rem;
  color: #1e2b4f;
`;

const HelpBtn = styled.div`
  display: inline-block;
  width: 1.875rem;
  height: 1.625rem;
  background-image: url("/img/btn/help-btn.png");
  background-size: 1.25rem 1.25rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductInfos = styled.div`
  height: calc(100% - 8.125rem);
  overflow: scroll;
  overflow-x: hidden;
`;
