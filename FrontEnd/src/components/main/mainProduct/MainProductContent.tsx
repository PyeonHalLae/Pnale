import ProductCard from "@components/common/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { mainCard } from "@model/commonType";
const MainProductContent = () => {
  const [sale, setSale] = useState<mainCard[]>([]);

  useEffect(() => {
    axios.get("/api/product?page=0").then((res) => {
      const saleRes = res.data.data.content.slice(0, 4);
      setSale(saleRes);
    });
  }, []);
  return (
    <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">
      {sale.map((info, index) => (
        <ProductCard key={index + "_" + info.productResponseDto.productId} data={info} />
      ))}{" "}
    </div>
  );
};

export default MainProductContent;
