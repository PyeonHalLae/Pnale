import ProductCard from "@components/common/ProductCard";
import axios, { AxiosError } from "axios";
// import { useEffect, useState } from "react";
import { ProductComp } from "@model/commonType";
import { useQuery } from "react-query";

const MainProductContent = () => {
  // 리액트 쿼리를 활용한 axios 요청2
  const {
    data: name,
    isLoading,
    isError,
    error,
  } = useQuery<ProductComp[], AxiosError>(
    "mainProduct",
    async () => {
      const response = await axios.get("/api/product/main");
      return response.data.data.recommands;
    },
    {
      onSuccess: (res) => {
        console.log("onSuccess");
        console.log(res);
      },
      onError: (error) => {
        console.log("onError");
        console.log(error?.response?.status);
      },
      onSettled: () => {
        console.log("아무튼 Go");
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
    <div className="grid grid-cols-2 p-3 bg-white gap-y-3 gap-x-3">
      {name.map((info, index) => (
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
