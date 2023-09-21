// import React from 'react'

import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";

const PyeneDirectList = () => {
  const { pyenType } = useParams<string>();
  return (
    <>
      <BackSide>
        <hr className="border-common-bold-back-color" />
        {pyenType !== "SEVEN" && <div>SEVEN</div>}
        {pyenType !== "EMART" && <div>EMART</div>}
        {pyenType !== "CU" && <div>CU</div>}
        {pyenType !== "GS25" && <div>GS25</div>}
      </BackSide>
    </>
  );
};

export default PyeneDirectList;

const BackSide = tw.div`
    w-[calc(100%-20px)]
    mx-auto
    flex
    justify-around
`;
