import ProductCard from "@components/common/ProductCard";
import React from "react";

const MainProductContent = () => {
  return (
    <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default MainProductContent;
