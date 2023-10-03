import { ProductComp } from "@/model/commonType";
import { searchIdsArray } from "@/recoil/kdmRecoil";
import ProductCard from "@components/common/ProductCard";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";

const SearchProduct = () => {
  const idsArray = useRecoilValue(searchIdsArray);
  console.log("************", idsArray);

  // const [searchData, setSearchData] = useState<ProductComp[]>([]);

  // useEffect(() => {
  //   axios.post(`/api/search/product?page=0`, { ids: location.state }).then((res) => {
  //     setSearchData(res.data.data.content);
  //   });
  //   /* eslint-disable-next-line */
  // }, [location.state]);
  // console.log(searchData);

  const callPageData = async (pageNo: number) => {
    const res = await axios.post(`/api/search/product?page=${pageNo}`, { ids: idsArray });

    return res;
  };

  const { data, fetchNextPage, status } = useInfiniteQuery(
    "searchData",
    ({ pageParam = 0 }) => callPageData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.data.data.content.last === true) {
          console.log("더이상 불러올 페이지가 없습니다");
          return undefined;
        }
        return allPages.length;
      },
      retry: 1,
      cacheTime: 0,
    }
  );

  // useEffect(() => {
  //   // 컴포넌트가 마운트된 후에 데이터를 가져오도록 설정
  //   fetchNextPage();
  // }, [fetchNextPage]);

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
          <div className="col-span-2 text-center my-4">더이상 불러올 페이지가 없습니다</div>
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
