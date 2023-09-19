// import React from "react";
import styled from "styled-components";

interface helpStateHandlerProps {
  helpStateHandler: () => void;
}

const ProductHelp = ({ helpStateHandler }: helpStateHandlerProps) => {
  return (
    <>
      <Background>
        <CloseBtn
          onClick={() => {
            helpStateHandler();
          }}
        ></CloseBtn>
        <HelpImg />
      </Background>
    </>
  );
};

export default ProductHelp;

const Background = styled.div`
  min-width: 22.5rem;
  max-width: 28.125rem;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 30;
  background-color: rgba(51, 51, 51, 0.8);
`;

const CloseBtn = styled.div`
  width: 1.875rem;
  height: 1.875rem;
  float: right;
  margin: 0.9375rem 0.9375rem 0rem 0rem;
  background-image: url("/img/btn/close-btn-white.png");
  background-size: 1.5625rem 1.5625rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const HelpImg = styled.div`
  margin: 50% auto;
  width: 21.875rem;
  height: 20.625rem;
  background-image: url("/img/help/myproduct-help.png");
  background-size: 21.875rem 20.625rem;
  background-position: center;
  background-repeat: no-repeat;
`;
