import React from "react";
import styled from "styled-components";

const MyProduct = () => {
  return (
    <>
      <MyProductHeader>
        <BackBtn />
        <div className="pt-[90px] pl-[13px]">
          <Title>관심 상품</Title>
          <HelpBtn />
        </div>
      </MyProductHeader>
      <ProductInfos></ProductInfos>
    </>
  );
};

export default MyProduct;

const MyProductHeader = styled.div`
  background-color: white;
  height: 130px;
`;

const BackBtn = styled.div``;

const Title = styled.div`
  display: inline-block;
  font-size: 25px;
  height: 30px;
`;

const HelpBtn = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("/img/btn/help-btn.png");
  background-size: 20px 20px;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductInfos = styled.div``;
