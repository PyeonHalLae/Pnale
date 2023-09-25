import ProductCard from "@components/common/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "@model/commonType";

const SearchArea = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<Main[]>([]);

  useEffect(() => {
    axios.get("/api/product/main").then((res) => {
      const saleRes = res.data.data.recommands;
      setSearch(saleRes);
    });
  }, []);

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
        {search.map((info, index) => (
          <ProductCard
            key={index + "-" + info.product.productId}
            id={index + "-" + info.product.productId}
            product={info}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchArea;
