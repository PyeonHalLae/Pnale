// import React from "react";
import styled from "styled-components";

interface helpStateHandlerProps {
  helpStateHandler: () => void;
}

const ProductHelp = ({ helpStateHandler }: helpStateHandlerProps) => {
  return (
    <>
      <CloseBtn
        onClick={() => {
          helpStateHandler();
        }}
      ></CloseBtn>
      <HelpImg></HelpImg>
      <Background></Background>
    </>
  );
};

export default ProductHelp;

const Background = styled.div`
  width: 100vh;
  height: 100vh;
  position: absolute;
  z-index: 10;
  background-color: rgba(51, 51, 51, 0.8);
`;

const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 20;
  background-image: url("/img/btn/close-btn-white");
  background-size: 20px 20px;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid black;
`;

const HelpImg = styled.div``;
