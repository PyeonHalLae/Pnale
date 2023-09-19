import ProductCard from "@components/common/ProductCard";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchArea = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white ">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-peach">검색</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 상품</span>
        </div>
        <button
          className="absolute right-0 inline-block pr-5 font-bold bottom-4 text-common-peach"
          onClick={() => navigate("/search-product")}
        >
          더보기
        </button>
      </div>
      <div className="grid grid-cols-2 p-2 gap-y-3 gap-x-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default SearchArea;
