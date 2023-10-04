import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "@/components/mypage/mypage2/ProductCard";
import { useState, useEffect } from "react";
import ProductHelp from "@/components/mypage/mypage2/ProductHelp";
import { ProductComp } from "@/model/commonType";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserInfoExpires } from "@/model/toastMessageJHM";
import tw from "tailwind-styled-components";

const MyProduct = () => {
  const navigate = useNavigate();

  const [helpState, setHelpState] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<ProductComp[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const helpStateHandler = () => {
    setHelpState((prev) => {
      return !prev;
    });
  };

  const AxiosHandler = () => {
    axios
      .get("/api/mypage/pick_prod?page=" + currentPage, {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          setProductInfo([...productInfo, ...resData.data.content]);
          setTotalPage(resData.data.totalPages);
          setCurrentPage(currentPage + 1);
        }
      })
      .catch((err) => {
        if (err.code === 401) {
          //리프레시 토큰 재발급
          axios
            .get("/api/auth/mypage/pick_prod?page=" + currentPage, {
              withCredentials: true,
            })
            .then((res) => {
              //재발급이 잘되서 정보를 받아온경우
              const resData = res.data;
              if (resData.code == 200) {
                setProductInfo([...productInfo, ...resData.data.content]);
                setTotalPage(resData.data.totalPages);
                setCurrentPage(currentPage + 1);
              }
            })
            .catch((err) => {
              if (err.code === 403) {
                //제발급 실패! 재로그인 해주세요!!
                UserInfoExpires();
                setProductInfo(null);
                navigate("/mypage");
              } else {
                console.log("서버 오류 발생");
              }
            });
        } else {
          if (err.code === 403) {
            //처음부터 토큰이 없는경우 ! 로그인화면 보여준다
            setProductInfo(null);
            navigate("/mypage");
          } else {
            //그외 서버 오류
            console.log("서버 오류 발생");
          }
        }
      });
  };

  //유저 정보 만료
  useEffect(() => {
    AxiosHandler();
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      {helpState && (
        <ProductHelp
          helpStateHandler={() => {
            helpStateHandler();
          }}
        />
      )}
      <MyProductHeader>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="pt-[85px] pl-[15px]">
          <Title>관심 상품</Title>
          <HelpBtn
            onClick={() => {
              helpStateHandler();
            }}
          />
        </div>
      </MyProductHeader>
      <ProductInfos>
        {productInfo &&
          productInfo.map((value) => (
            <ProductInfo key={value.product.productId} $productInfo={value} />
          ))}

        <ProductAddBox>
          {totalPage > 1 && currentPage + 1 < totalPage && (
            <AddBtn
              onClick={() => {
                AxiosHandler();
              }}
            >
              더보기 +
            </AddBtn>
          )}
        </ProductAddBox>
      </ProductInfos>
    </>
  );
};

export default MyProduct;

const MyProductHeader = styled.div`
  background-color: white;
  height: 8.125rem;
  position: sticky;
  top: 0rem;
`;

const BackBtn = styled.div`
  float: left;
  width: 0.6875rem;
  height: 1.3125rem;
  margin-left: 1.25rem;
  margin-top: 1.875rem;
  background-image: url("/img/btn/left-btn.png");
  background-size: 0.6875rem 1.3125rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 1.875rem;
  height: 2.5rem;
  color: #1e2b4f;
`;

const HelpBtn = styled.div`
  display: inline-block;
  width: 1.875rem;
  height: 1.625rem;
  background-image: url("/img/btn/help-btn.png");
  background-size: 1.25rem 1.25rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductInfos = styled.div`
  height: calc(100% - 8.125rem);
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid black;
`;

const ProductAddBox = tw.div`
  flex h-24
`;

const AddBtn = tw.div`mx-auto my-auto text-common-text-color text-[20px]`;
