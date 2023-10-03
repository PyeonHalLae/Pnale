import { ProductComp } from "@/model/commonType";
import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { loadImage } from "@model/exportFucKDM";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export type ProductCardProps = {
  product: ProductComp;
  id: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, id }) => {
  console.log(product.userLike.likeStat);

  //좋아요 버튼
  const LikeClickHandler = () => {
    axios
      .patch("/api/product/pick/" + product.product.productId, {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          toast.error(res.data.message, {
            position: "top-center", // 원하는 포지션 설정
            autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
            hideProgressBar: true,
          });
        }
      })
      .catch((err) => {
        if (err.response.state === 401) {
          //리프레시 토큰 재발급
          axios
            .patch("/api/auth/product/pick/" + product.product.productId, {
              withCredentials: true,
            })
            .then((res) => {
              //재발급이 잘되서 정보를 받아온경우
              const resData = res.data;
              if (resData.code == 200) {
                toast.error(res.data.message, {
                  position: "top-center", // 원하는 포지션 설정
                  autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
                  hideProgressBar: true,
                });
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                toast.error(err.response.data, {
                  position: "top-center", // 원하는 포지션 설정
                  autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
                  hideProgressBar: true,
                });
              } else {
                console.log("서버 오류 발생");
              }
            });
        } else {
          console.log(err);
          if (err.response.status === 403) {
            console.log(product.product.productId);

            toast.error(err.response.data, {
              position: "top-center", // 원하는 포지션 설정
              autoClose: 1000, // 메시지를 자동으로 닫을 시간 (밀리초)
              hideProgressBar: true,
            });
          } else {
            //그외 서버 오류
            console.log("서버 오류 발생");
          }
        }
      });
  };

  useEffect(() => {
    loadImage(product.product.productImg, id);
  }, [product.product.productImg, id]);
  return (
    <Card>
      <ToastContainer position="top-center" />
      <ImageArea id={`${id}`}></ImageArea>
      <div className="flex p-1.5 m-auto">
        {product.event.cutype !== null && (
          <StickerImg src={`/img/sticker/main/CU-${product.event.cutype}.png`}></StickerImg>
        )}
        {product.event.emarttype !== null && (
          <StickerImg src={`/img/sticker/main/EMART-${product.event.emarttype}.png`}></StickerImg>
        )}
        {product.event.gstype !== null && (
          <StickerImg src={`/img/sticker/main/GS-${product.event.gstype}.png`}></StickerImg>
        )}
        {product.event.seventype !== null && (
          <StickerImg src={`/img/sticker/main/SEVEN-${product.event.seventype}.png`}></StickerImg>
        )}
        {product.event.seventype === null &&
          product.event.cutype === null &&
          product.event.gstype === null &&
          product.event.emarttype === null && (
            <StickerImg src={`/img/sticker/main/None-Event.png`}></StickerImg>
          )}
      </div>
      <TextArea>
        <div className="flex">
          <Categori>{product.product.category}</Categori>
          <img
            src={product.userLike.likeStat ? "/img/btn/like-true.png" : "/img/btn/like-false.png"}
            alt="즐겨찾기"
            className="absolute right-0 inline-block w-4 m-1.5"
            onClick={() => LikeClickHandler()}
          />
        </div>
        <p className="mx-1.5 text-sm max-w-130 line-clamp-1">
          {product.product.productName.slice(product.product.productName.indexOf(")") + 1)}
        </p>
        <Price>{product.product.price}</Price>
        <span className="mr-4">원</span>
      </TextArea>
    </Card>
  );
};

export default ProductCard;

const Card = tw.div`
shadow-[0px_0px_2px_#0000003f]
`;

const ImageArea = tw.div`
p-2
m-auto
h-[22vh]
justify-center
min-w-[160px]
min-h-[160px]
flex`;

const TextArea = tw.div`
relative
bg-common-back-color
text-common-text-color
`;

const StickerImg = tw.img`
mr-1.5
w-[23%]
`;

const Categori = tw.p`
pt-[2px]
font-bold
text-xs
border-2
border-common-text-color
px-1
m-1
rounded
bg-white
max-w-[120px]
hover:line-clamp-none
line-clamp-1
`;

const Price = tw.div`
font-bold
text-xl
ml-1.5
mr-0.5
inline-block
`;
