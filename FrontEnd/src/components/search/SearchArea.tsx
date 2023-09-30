import { useNavigate } from "react-router-dom";
import { searchDateSearch } from "@/model/searchType";
import ProductCard from "@components/common/ProductCard";

type SearchAreaPros = {
  search: searchDateSearch;
};

const SearchArea = ({ search }: SearchAreaPros) => {
  const navigate = useNavigate();
  // const [search, setSearch] = useState<ProductComp[]>([]);
  console.log("search", search);

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
        {search.content.map((info, index) => (
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
