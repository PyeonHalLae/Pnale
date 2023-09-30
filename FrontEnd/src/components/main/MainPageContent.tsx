import { useNavigate } from "react-router-dom";

import MainProduct from "./mainProduct/MainProduct";
import MainRecipe from "./mainRecipe/MainRecipe";
import tw from "tailwind-styled-components";
import { useQuery } from "react-query";
import { RecipeAndRecommand } from "@/model/commonType";
import axios, { AxiosError } from "axios";

const MainPageContent = () => {
  const navigate = useNavigate();

  // 리액트 쿼리를 활용한 axios 요청2
  const { data, isLoading, isError, error } = useQuery<RecipeAndRecommand, AxiosError>(
    "mainProduct",
    async () => {
      const response = await axios.get("/api/product/main");
      // console.log("response: ", response.data.data);

      return response.data.data;
    },
    {
      // onSuccess: (res) => {
      //   console.log("onSuccess");
      //   console.log(res);
      // },
      onError: (error) => {
        console.log("onError");
        console.log(error?.response?.status);
      },
      onSettled: () => {
        // console.log("아무튼 Go");
      },
      retry: 2,
    }
  );

  if (isLoading) {
    return <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">로딩중</div>;
  }

  if (isError) {
    return <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">{error.message}</div>;
  }

  // 리액트 쿼리를 활용한 axios 요청
  // const {
  //   data: name,
  //   isLoading,
  //   isError,
  // } = useQuery<ProductComp[]>(
  //   "mainProduct",
  //   async () => {
  //     const response = await axios.get("/api/product/main");
  //     return response.data.data.recommands;
  //   },
  //   { retry: 2 }
  // );

  // if (isLoading) {
  //   return <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">로딩중</div>;
  // }

  // if (isError) {
  //   return <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">에러!!!!!!!!!</div>;
  // }

  // 일반적인 axios + const함수로 호출
  // const [sale, setSale] = useState<ProductComp[]>([]);
  // useEffect(() => {
  //   const mainProduct = async () => {
  //     try {
  //       const response = await axios.get("/api/product/main");
  //       console.log("요청 성공:", response.data.data.recommands);
  //       const saleRes = response.data.data.recommands;
  //       setSale(saleRes);
  //     } catch (error) {
  //       console.error("요청 실패:", error);
  //     }
  //   };
  //   mainProduct();
  // }, []);

  return (
    <MainPage>
      <MainRecipe />
      <img src="/img/etc/eventBanner.png" onClick={() => navigate("/pyenEevent")}></img>
      <MainProduct recommands={data.recommands} />
    </MainPage>
  );
};

export default MainPageContent;

const MainPage = tw.div`
animate-moveToRight
`;
