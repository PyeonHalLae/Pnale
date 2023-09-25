import ProductCard from "@components/common/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainCard } from "@model/commonType";

const SearchArea = () => {
  const navigate = useNavigate();
  const [sale, setSale] = useState<mainCard[]>([]);

  useEffect(() => {
    axios.get("/api/product/main").then((res) => {
      console.log(res);

      // const saleRes = res.data.data.content.slice(0, 4);
      // setSale(saleRes);
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
        {sale.map((info, index) => (
          <ProductCard key={index + "_" + info.productResponseDto.productId} data={info} />
        ))}
      </div>
    </div>
  );
};

export default SearchArea;
