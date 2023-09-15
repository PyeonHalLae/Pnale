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
  min-width: 360px;
  max-width: 450px;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 30;
  background-color: rgba(51, 51, 51, 0.8);
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  float: right;
  margin: 15px 15px 0px 0px;
  background-image: url("/img/btn/close-btn-white.png");
  background-size: 25px 25px;
  background-position: center;
  background-repeat: no-repeat;
`;

const HelpImg = styled.div`
  margin: 50% auto;
  width: 350px;
  height: 330px;
  background-image: url("/img/help/myproduct-help.png");
  background-size: 350px 330px;
  background-position: center;
  background-repeat: no-repeat;
`;
