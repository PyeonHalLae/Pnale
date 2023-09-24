// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// import tw from "tailwind-styled-components";

const PyeneEventHeader = () => {
  const { pyenType } = useParams<string>();
  const [pyeneColor, setPyeneColor] = useState<string>();
  const navigate = useNavigate();

  const colorMap = {
    CU: "#652F8D",
    GS: "#006FBA",
    EMART: "#636569",
    SEVEN: "#F18713",
  };

  useEffect(() => {
    setPyeneColor(colorMap[pyenType]);
  });

  return (
    <>
      <BackSize $pyeneColor={pyeneColor} $pyenType={pyenType}>
        <p
          onClick={() => {
            navigate(-1);
          }}
        />
        <img src={`/img/icons/${pyenType}-icon.png`} />
        <div>행사</div>
      </BackSize>
    </>
  );
};

export default PyeneEventHeader;

const BackSize = styled.div<{ $pyeneColor: string; $pyenType: string }>`
  position: absolute;
  z-index: 10;
  display: flex;
  font-size: 27px;
  height: 60px;
  width: 100%;
  min-width: 360px;
  max-width: 450px;
  background-color: white;
  padding: 12px 0px 0px 15px;
  img {
    height: 37px;
    border-top: 3px solid ${(props) => props.$pyeneColor};
    padding-top: 5px;
  }
  div {
    font-weight: bold;
    color: ${(props) => props.$pyeneColor};
    border-top: 3px solid ${(props) => props.$pyeneColor};
    padding-top: 3px;
    margin-right: 5px;
  }
  p {
    margin: 6px 20px 0px 10px;
    color: #1e2b4f;
    height: 22px;
    width: 15px;
    background-image: url("/img/btn/left-btn.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
