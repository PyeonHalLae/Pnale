import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "@/components/mypage/mypage2/ProductCard";

const MyProduct = () => {
  const navigate = useNavigate();

  return (
    <>
      <MyProductHeader>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="pt-[85px] pl-[15px]">
          <Title>관심 상품</Title>
          <HelpBtn />
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
  height: 130px;
  position: sticky;
  top: 0px;
`;

const BackBtn = styled.div`
  float: left;
  width: 11px;
  height: 21px;
  margin-left: 20px;
  margin-top: 30px;
  background-image: url("/img/btn/left-btn.png");
  background-size: 11px 21px;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 30px;
  height: 40px;
  color: #1e2b4f;
`;

const HelpBtn = styled.div`
  display: inline-block;
  width: 30px;
  height: 26px;
  background-image: url("/img/btn/help-btn.png");
  background-size: 20px 20px;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductInfos = styled.div`
  height: calc(100% - 130px);
  overflow: scroll;
  overflow-x: hidden;
`;
