import MainProductContent from "./MainProductContent";
import MainProductHeader from "./MainProductHeader";
import { ProductComp } from "@/model/commonType";

type MainProductContentPros = {
  recommands: ProductComp[];
};
const MainProduct: React.FC<MainProductContentPros> = ({ recommands }) => {
  return (
    <div>
      <MainProductHeader />
      <MainProductContent recommands={recommands} />
    </div>
  );
};

export default MainProduct;
