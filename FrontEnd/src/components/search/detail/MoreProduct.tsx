import { ProductComp } from "@/model/commonType";
import ProductCard from "@components/common/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

const SearchProduct = () => {
  const [searchData, setSearchData] = useState<ProductComp[]>([]);

  useEffect(() => {
    axios.get("/api/product/main").then((res) => {
      const searchRes = res.data.data.recommands;
      setSearchData(searchRes);
    });
  }, []);
  return (
    <div className="bg-white ">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-peach">검색</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 상품</span>
        </div>
      </div>
      <div className="grid grid-cols-2 p-2 gap-y-3 gap-x-3">
        {searchData.map((info, index) => (
          <ProductCard
            key={index + "-" + info.product.productId + "-search"}
            id={index + "-" + info.product.productId + "-search"}
            product={info}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchProduct;
