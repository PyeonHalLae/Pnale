import { ProductComp } from "@/model/commonType";
import ProductCard from "@components/common/ProductCard";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useLocation } from "react-router-dom";

const SearchProduct = () => {
  const location = useLocation();
  console.log(location.state);

  // const [searchData, setSearchData] = useState<ProductComp[]>([]);

  // useEffect(() => {
  //   axios.post(`/api/search/product?page=0`, { ids: location.state }).then((res) => {
  //     setSearchData(res.data.data.content);
  //   });
  //   /* eslint-disable-next-line */
  // }, [location.state]);
  // console.log(searchData);

  const callPageData = async (pageNo: number) => {
    const res = await axios.post(`/api/search/product?page=${pageNo}`, { ids: location.state });
    return res;
  };

  const { data, fetchNextPage, status } = useInfiniteQuery(
    "searchData",
    ({ pageParam = 0 }) => callPageData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        // console.log("allPages: ", allPages);
        console.log("lastPage: ", lastPage);

        if (lastPage?.data.data.content.last === true) {
          console.log("더이상 불러올 페이지가 없습니다");
          return;
        }
        return allPages.length;
      },
      retry: 1,
    }
  );

  return (
    <div className="bg-white ">
      <div className="p-3.5 relative ">
        <div className="inline-block ">
          <span className="text-2xl font-bold text-center text-common-peach">검색</span>
          <span className="text-2xl font-bold text-center text-common-text-color"> 상품</span>
        </div>
      </div>
      <div className="grid grid-cols-2 p-2 gap-y-3 gap-x-3">
        {data?.pages?.map((page) =>
          page.data.data.content.map((info: ProductComp, index: number) => (
            <ProductCard
              key={index + "-" + info.product.productId + "-search"}
              id={index + "-" + info.product.productId + "-search"}
              product={info}
            />
          ))
        )}
        {status === "error" ? (
          <div className="col-span-2 text-center">더이상 불러올 페이지가 없습니다</div>
        ) : (
          <button className="col-span-2 text-center my-4" onClick={() => fetchNextPage()}>
            더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
