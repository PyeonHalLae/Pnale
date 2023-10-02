import ProductCard from "@components/common/ProductCard";
import { ProductComp } from "@model/commonType";

type MainProductContentPros = {
  recommands: ProductComp[];
};

const MainProductContent: React.FC<MainProductContentPros> = ({ recommands }) => {
  // console.log("recommands", recommands);

  return (
    <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">
      {recommands.map((info, index) => (
        <ProductCard
          key={index + "-" + info.product.productId + "-search"}
          id={index + "-" + info.product.productId + "-search"}
          product={info}
        />
      ))}
    </div>
  );
};

export default MainProductContent;
