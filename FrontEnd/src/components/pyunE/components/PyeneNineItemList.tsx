// import React from 'react'

import tw from "tailwind-styled-components";
import PyeneProductCard from "../card/PyeneProductCard";

const PyeneNineItemList = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-y-3">
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
        <PyeneProductCard />
      </div>
      <PageBtn> 1 2 3 4 5 6 7 8 9 10</PageBtn>
    </>
  );
};

export default PyeneNineItemList;

const PageBtn = tw.div`
    mt-[20px]
    mx-auto
    w-[150px]
    

`;
