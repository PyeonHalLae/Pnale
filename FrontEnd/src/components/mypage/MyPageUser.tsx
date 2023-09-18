import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import tw from "tailwind-styled-components";

const myPageType = [
  { icon: "/img/btn/recipe.png", text: "레시피관리", url: "recipe" },
  { icon: "/img/btn/comment.png", text: "댓글 관리", url: "comment" },
  { icon: "/img/btn/user.png", text: "정보 수정", url: "modify" },
];

interface userInfoType {
  userName: string;
  userImage: string;
}

interface productInfoType {
  productImage: string;
  productName: string;
}

const userInfos = {
  userName: "정현모",
  userImage: "/img/logo/logo-pink.png",
};

const MyPageUser = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<userInfoType>({ userName: "", userImage: "" });
  const [productInfo, setProductInfo] = useState<productInfoType[]>([]);

  useEffect(() => {
    setProductInfo([
      { productImage: "/img/test/image61.png", productName: "농심) 포테토칩 오리지널 120g" },
      {
        productImage: "/img/test/image61.png",
        productName: "농심) 포테토칩 오리지널 120g입니다용효ㅗㅗ호호",
      },
      { productImage: "/img/test/image61.png", productName: "!333" },
      { productImage: "/img/test/image61.png", productName: "!444" },
      { productImage: "/img/test/image61.png", productName: "!555" },
      { productImage: "/img/test/image61.png", productName: "!666" },
    ]);
  }, []);

  useEffect(() => {
    setUserInfo(userInfos);
  }, []);

  return (
    <>
      {userInfo.userName === null || userInfo.userName === "" ? (
        <div className="h-[calc(100vh-60px)] bg-white">
          <MyPageHeader>
            <UserBox>
              <div className="mt-20 ml-4">
                <span className="text-[35px] text-[#AEB0B6] h-[35px]">
                  <span className="text-[#1E2B4F]">로그인</span>을 해주세요
                </span>
                <LoginBtnImage />
              </div>
            </UserBox>
            <div className="flex justify-around w-full mx-auto ">
              {myPageType.map((value, index) => (
                <SideButton key={value.text + index} $icon={value.icon}>
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
              <UserImage $imgurl={userInfo.userImage} />
              <div className="text-2xl text-[#AEB0B6] mt-11">
                <span className="text-[#1E2B4F]">{userInfo.userName}</span>님<br />
                반갑습니다!
                <div className="text-sm">로그아웃</div>
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
                {productInfo.map((value, index) => (
                  <Product key={value.productName + index}>
                    <ProductImage $imgurl={value.productImage} />
                    <ProductName>{value.productName}</ProductName>
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
bg-white h-[300px]
`;

const UserBox = tw.div`
flex h-40 mx-auto w-[360px]
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

const UserImage = styled.div<{ $imgurl: string }>`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-image: url(${(props) => props.$imgurl});
  background-size: 4.5rem 4.5rem;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto 1rem;
  border: 0.0313rem solid rgba(0, 0, 0, 0.25);
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
