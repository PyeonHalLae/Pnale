import PyeneAddHeader from "./card/PyeneAddHeader";
import { ProductComp } from "@/model/commonType";
import PyeneProductCard from "./card/PyeneProductCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import tw from "tailwind-styled-components";

const PyeneAddList = () => {
  //페이지를 위한 state
  const [totalPage, setTotalPage] = useState<number>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { pyenType } = useParams<string>();
  const location = useLocation();
  const moreType = location.state as string;
  const [productList, setProductList] = useState<ProductComp[]>([]);
  const navigate = useNavigate();

  const AxiosHandler = () => {
    let getUrl = "";

    if (moreType === "BEST") {
      getUrl = "/api/conv/best/" + pyenType + "?page=" + currentPage;
    }
    if (moreType === "NEW") {
      getUrl = "/api/conv/new/" + pyenType + "?page=" + currentPage;
    }

    axios
      .get(getUrl)
      .then((res) => {
        const resData = res.data;
        setProductList([...productList, ...resData.data.content]);
        setCurrentPage((prev) => prev + 1);
        setTotalPage(resData.data.totalPages);
      })
      .catch(() => {
        ToastErrorMessage("데이터를 받아오지 못했습니다");
        navigate(-1);
      });
  };

  useEffect(() => {
    setCurrentPage(0);
    AxiosHandler();
  }, [moreType]);

  return (
    <>
      <PyeneAddHeader />
      <MainBox>
        <ProductBox>
          {productList.map((value) => (
            <PyeneProductCard
              key={value.product.productId}
              $productInfo={value}
              $listType={moreType}
            />
          ))}
        </ProductBox>
        <ProductAddBox>
          {totalPage > 1 && currentPage < totalPage && (
            <AddBtn
              onClick={() => {
                AxiosHandler();
              }}
            >
              더보기
            </AddBtn>
          )}
        </ProductAddBox>
      </MainBox>
    </>
  );
};

export default PyeneAddList;

const MainBox = tw.div`w-full`;

const ProductBox = tw.div`w-[calc(100% - 10px)] grid grid-cols-3 h-[calc(100% - 50px)] border mt-16`;

const ProductAddBox = tw.div` flex h-24`;

const AddBtn = tw.div`mx-auto my-auto  text-common-text-gray-color  text-[20px]`;
