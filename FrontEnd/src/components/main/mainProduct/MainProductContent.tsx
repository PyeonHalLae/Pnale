import ProductCard from "@components/common/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Main } from "@model/commonType";

const MainProductContent = () => {
  const [sale, setSale] = useState<Main[]>([]);

  useEffect(() => {
    axios.get("/api/product/main").then((res) => {
      const saleRes = res.data.data.recommands;
      setSale(saleRes);
    });
  }, []);
  return (
    <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">
      {sale.map((info, index) => (
        <ProductCard key={index + "_" + info.product.productId} product={info} />
      ))}
    </div>
  );
};

export default MainProductContent;
