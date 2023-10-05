import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import tw from "tailwind-styled-components";
import axios from "axios";
import { ProductComp } from "@/model/commonType";

import "react-toastify/dist/ReactToastify.css";
import { UserNotLogin } from "@/model/toastMessageJHM";

const myPageType = [
  { icon: "/img/btn/recipe.png", text: "레시피관리", url: "recipe" },
  { icon: "/img/btn/comment.png", text: "댓글 관리", url: "comment" },
  { icon: "/img/btn/user.png", text: "정보 수정", url: "modify" },
];

interface UserInfoType {
  memberId: number;
  nickname: string;
  socialType: string;
  memberImg: string;
  email: string;
  usrEmail: boolean;
  mailReceive: boolean;
}

const MyPageUser = () => {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState<ProductComp[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfoType>(null);

  useEffect(() => {
    console.log("마이페이지 엑시오스 요청");
    axios
      .get("/api/mypage/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res, "처음 요청");
        //로그인 된경우
        const resData = res.data;
        if (resData.code == 200) {
          setUserInfo(resData.data.member);
          setProductInfo(resData.data.memberPick.content);
        }
      })
      .catch((err) => {
        //로그인 실패 (엑세스 토큰이 존재하나 만료)
        if (err.response.status === 401) {
          //리프레시 토큰 재발급
          console.log("리프레시 토큰을 통한 엑세스 토큰 재발급");
          axios
            .get("api/auth/mypage", {
              withCredentials: true,
            })
            .then((res) => {
              console.log("리프레시로 요청");
              //재발급이 잘되서 정보를 받아온경우
              const resData = res.data;
              if (resData.code == 200) {
                setUserInfo(resData.data.member);
                setProductInfo(resData.data.memberPick.content);
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                //제발급 실패! 재로그인 해주세요!!
                console.log("로그인인 만료되어 재 로그인 해주세요!");
                setUserInfo(null);
                setProductInfo(null);
              } else {
                console.log("서버 오류 발생");
              }
            });
        } else {
          if (err.response.status === 403) {
            //처음부터 토큰이 없는경우 ! 로그인화면 보여준다
            setUserInfo(null);
            setProductInfo(null);
          } else {
            //그외 서버 오류
            console.log("서버 오류 발생");
          }
        }
      });
  }, []);

  const LoginPageMoveHandler = () => {
    navigate("/sociallogin");
  };

  const LogoutHandler = () => {
    axios
      .post("/api/member/logout")
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          setUserInfo(null);
          setProductInfo([]);
        }
      })
      .catch((err) => {
        console.log("로그아웃 실패", err);
      });
  };

  return (
    <>
      {userInfo === null ? (
        <div className="h-[calc(100vh-60px)] bg-white">
          <MyPageHeader>
            <UserBox onClick={LoginPageMoveHandler}>
              <div className="mt-20 ml-4">
                <span className="text-[35px] text-[#AEB0B6] h-[35px]">
                  <span className="text-[#1E2B4F]">로그인</span>을 해주세요
                </span>
                <LoginBtnImage />
              </div>
            </UserBox>
            <div className="flex justify-around w-full mx-auto ">
              {myPageType.map((value, index) => (
                <SideButton
                  key={value.text + index}
                  $icon={value.icon}
                  onClick={() => {
                    UserNotLogin();
                  }}
                >
                  <div /> <p>{value.text}</p>
                </SideButton>
              ))}
            </div>
          </MyPageHeader>
          <LikeProduct>
            <div className="h-14">
              <p className="float-left mt-3 ml-3.5 text-[20px] text-[#1E2B4F]">관심상품</p>
            </div>
          </LikeProduct>
        </div>
      ) : (
        <div className="h-[calc(100vh-60px)] bg-white">
          <MyPageHeader>
            <UserBox>
              <UserImage src={userInfo.memberImg} />
              <div className="text-2xl text-[#AEB0B6] mt-11">
                <span className="text-[#1E2B4F]">{userInfo.nickname}</span>님<br />
                반갑습니다!
                <div
                  className="text-sm"
                  onClick={() => {
                    LogoutHandler();
                  }}
                >
                  로그아웃
                </div>
              </div>
            </UserBox>
            <div className="flex justify-around w-full mx-auto ">
              {myPageType.map((value, index) => (
                <SideButton
                  key={value.text + index}
                  $icon={value.icon}
                  onClick={() => {
                    navigate(value.url);
                  }}
                >
                  <div /> <p>{value.text}</p>
                </SideButton>
              ))}
            </div>
          </MyPageHeader>
          <LikeProduct>
            <div className="h-14">
              <p className="float-left mt-3 ml-3.5 text-[20px] text-[#1E2B4F]">관심상품</p>
              <p
                className="float-right mt-5 mr-4 text-[13px] text-[#AEB0B6]"
                onClick={() => {
                  navigate("product");
                }}
              >
                더보기
              </p>
            </div>
            <div className="mx-auto w-[calc(100%-1rem)]">
              <Products>
                {productInfo &&
                  productInfo.map((value, index) => (
                    <Product key={value.product.productId + index}>
                      <ProductImage $imgurl={value.product.productImg} />
                      <ProductName>{value.product.productName}</ProductName>
                    </Product>
                  ))}
              </Products>
            </div>
          </LikeProduct>
        </div>
      )}
    </>
  );
};

export default MyPageUser;

const MyPageHeader = tw.div`
bg-white h-[18.75rem]
`;

const UserBox = tw.div`
flex h-40 mx-auto w-[22.5rem]
`;

const LoginBtnImage = styled.span`
  display: inline-block;
  width: 0.75rem;
  height: 1.25rem;
  margin-left: 0.625rem;
  background-image: url(/img/btn/right-btn.png);
  background-size: 0.75rem 1.25rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const SideButton = styled.div<{ $icon: string }>`
  width: 15rem;
  display: inline-block;
  text-align: center;
  div {
    height: 4rem;
    width: 4rem;
    margin: 0px auto;
    border-radius: 50%;
    background-color: #d9d9d9;
    background-image: url(${(props) => props.$icon});
    background-size: 2.1875rem 2.1875rem;
    background-position: center;
    background-repeat: no-repeat;
  }
  p {
    margin-top: 0.5rem;
    color: #1e2b4f;
    font-size: 0.9375rem;
  }
`;

const UserImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin: auto 1rem;
`;

const LikeProduct = styled.div`
  width: calc(100% - 2rem);
  height: 22.5rem;
  margin: 2rem auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  p {
    font-weight: 700;
    display: inline-block;
  }
`;

const Products = tw.div`
  grid grid-cols-3 
`;

const Product = styled.div`
  height: 8.75rem;
  width: 6.875rem;
  margin: 0.5rem auto 0rem auto;
`;

const ProductImage = styled.div<{ $imgurl: string }>`
  width: 5.9375rem;
  height: 6.25rem;
  margin: 0rem auto;
  background-image: url(${(props) => props.$imgurl});
  background-size: 5.9375rem 6.25rem;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductName = styled.div`
  width: 6.25rem;
  height: 1.875rem;
  margin: 0.3125rem auto 0rem auto;
  font-size: 0.625rem;
  color: #1e2b4f;
  font-weight: normal;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
