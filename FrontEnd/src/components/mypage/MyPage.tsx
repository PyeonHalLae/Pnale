import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

import tw from "tailwind-styled-components";

const myPageType = [
  { icon: "img/btn/recipy.png", text: "레시피관리" },
  { icon: "img/btn/comment.png", text: "댓글 관리" },
  { icon: "img/btn/user.png", text: "정보 수정" },
];

interface userInfoType {
  userName: string;
  userImage: string;
}

interface productInfoType {
  productImage: string;
  productName: string;
}

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<userInfoType>({
    userName: "정현모",
    userImage: "img/logo/logo-pink.png",
  });

  const [productInfo, setProductInfo] = useState<productInfoType[]>([]);

  useEffect(() => {
    setProductInfo([
      { productImage: "a1aa", productName: "!111" },
      { productImage: "aa2a", productName: "!222" },
      { productImage: "aa3a", productName: "!333" },
    ]);
  }, []);

  return (
    <>
      <div className="h-full bg-white">
        <MyPageHeader>
          <UserBox>
            <UserImage imgurl={userInfo.userImage} />
            <div className="text-2xl text-[#AEB0B6] mt-11">
              <span className="text-[#1E2B4F]">{userInfo.userName}</span>님<br />
              반갑습니다!
              <div className="text-sm">로그아웃</div>
            </div>
          </UserBox>
          <div className="flex justify-around mx-auto w-96 ">
            {myPageType.map((value, index) => (
              <SideButton key={value.text + index} icon={value.icon}>
                <div></div>
                <p>{value.text}</p>
              </SideButton>
            ))}
          </div>
        </MyPageHeader>
        <LikeProduct>
          <p className="float-left mt-3 ml-3.5 text-[20px] text-[#1E2B4F]">관심상품</p>
          <p className="float-right mt-5 mr-4 text-[13px] text-[#AEB0B6]">더보기</p>
          <Products>
            {productInfo.map((value, index) => (
              <Product key={value.productName + index}>
                <div>{value.productImage}</div>
                <div>{value.productName}</div>
              </Product>
            ))}
          </Products>
        </LikeProduct>
      </div>
    </>
  );
};

export default MyPage;

const SideButton = styled.div<{ icon: string }>`
  width: 15rem;
  display: inline-block;
  text-align: center;
  div {
    height: 4rem;
    width: 4rem;
    margin: 0px auto;
    border-radius: 50%;
    background-color: #d9d9d9;
    background-image: url(${(props) => props.icon});
    background-size: 2.5rem 2.5rem;
    background-position: center;
    background-repeat: no-repeat;
  }
  p {
    margin-top: 8px;
  }
  span {
    color: #16307e;
  }
`;

const UserImage = styled.div<{ imgurl: string }>`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-image: url(${(props) => props.imgurl});
  background-size: 4.5rem 4.5rem;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto 1rem;
  border: 1px solid black;
`;

const UserBox = tw.div`
  flex w-96 mx-auto h-40
`;

const MyPageHeader = tw.div`
  bg-white h-80
`;

const LikeProduct = styled.div`
  width: calc(100% - 2rem);
  height: 340px;
  margin: 2rem auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  p {
    font-weight: 700;
    display: inline-block;
  }
`;

const Products = styled.div``;

const Product = styled.div``;
