// import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const MyPageModify = () => {
  const navigate = useNavigate();

  return (
    <>
      <BackGround>
        <ModifyHeader>
          <BackBtn
            onClick={() => {
              navigate(-1);
            }}
          />
        </ModifyHeader>
        <ModifyMain>
          <Title>회원정보수정</Title>
          <ProfileImg>
            <img />
            <ImgChangBtn />
          </ProfileImg>
        </ModifyMain>
      </BackGround>
    </>
  );
};

export default MyPageModify;

const BackGround = tw.div`
    w-full h-full bg-white
`;

const ModifyHeader = tw.div`
    h-[81px]
`;

const ModifyMain = tw.div`
    h-[calc(100%-81px)]
    w-full
`;

const BackBtn = styled.div`
  float: left;
  width: 11px;
  height: 21px;
  margin-left: 20px;
  margin-top: 30px;
  background-image: url("/img/btn/left-btn.png");
  background-size: 11px 21px;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = tw.div`
    mx-auto
    text-[25px]
    text-center
    text-common-text-color
`;

const ProfileImg = styled.div`
  margin: 32px auto 0px auto;
  width: 128px;
  height: 128px;
  /* border: 1px solid black; */
  position: relative;
  img {
    margin: 3px auto;
    width: 122px;
    height: 122px;
    border: 1px solid black;
    border-radius: 50px;
  }
`;

const ImgChangBtn = styled.div`
  position: absolute;
  bottom: 4px;
  right: -5px;
  margin-top: calc(100% - 38px);
  width: 40px;
  height: 35px;
  background-image: url("/img/btn/profile-chang-btn.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
