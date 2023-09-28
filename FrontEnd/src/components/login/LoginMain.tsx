// import React from "react";
import tw from "tailwind-styled-components";
const LoginMain = () => {
  const LoginHandler = (type: string) => {
    window.location.href = "https://pnale.online/oauth2/authorization/" + type;
  };

  return (
    <>
      <BackSize>
        <LogImg src="/img/logo/logo-pink.png" />
        <BtnBox>
          <KakaoLoginBtn
            src="/img/test/kakao-login-임시.png"
            onClick={() => LoginHandler("kakao")}
          />
          <GoogleLoginBtn
            src="/img/test/google-login-임시.png"
            onClick={() => LoginHandler("google")}
          />
        </BtnBox>
      </BackSize>
    </>
  );
};

export default LoginMain;

const BackSize = tw.div`w-full`;

const LogImg = tw.img`mt-[15vh] h-[200px] w-[200px] mx-auto`;

const BtnBox = tw.div`mt-[15vh] w-[calc(100%-50px)] mx-auto`;

const KakaoLoginBtn = tw.img`w-[calc(100%-25px)] mx-auto`;

const GoogleLoginBtn = tw.img`w-[calc(100%-20px)] mx-auto mt-[15px]`;
