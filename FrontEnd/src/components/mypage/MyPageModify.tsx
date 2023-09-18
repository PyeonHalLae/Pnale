// import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const MyPageModify = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>();
  const [userImgSrc, setUserImgSrc] = useState<string>();

  const inputFileRef = useRef(null);

  //이름 변경 핸들러
  const nameChagneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  //이미지버튼 클릭시 발생 핸들러
  const imgChangBtnClickHandler = () => {
    inputFileRef.current.click();
  };

  //이미지 변경시 미리보기 이미지 변경 핸들러
  const changeImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const render = new FileReader();
      render.readAsDataURL(imgFile);

      render.onload = () => {
        setUserImgSrc(render.result as string);
      };
    }
  };

  useEffect(() => {
    setUserName("김동민");
    setUserImgSrc("/img/logo/logo-pink.png");
  }, []);

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
            <img src={userImgSrc} />
            <HiddenInput type="file" ref={inputFileRef} onChange={changeImgHandler} />
            <ImgChangBtn onClick={imgChangBtnClickHandler} />
          </ProfileImg>
          <NameBox>
            <input type="text" defaultValue={userName} onChange={nameChagneHandler} />
          </NameBox>
          <EmailCheckBox>
            <EmailInfo>
              <TypeImg />
              <EmailText>wjdgusaho@naver.com</EmailText>
            </EmailInfo>
            <EmailAgree>
              <AgreeText>메일 전송 수신 동의 </AgreeText>
              <input type="checkbox" value="true" />
            </EmailAgree>
            <EmailGuide>
              메일 전송 수신 동의를 하실 경우 관심상품의 행사 정보를 메일로 받을수 있습니다
            </EmailGuide>
          </EmailCheckBox>
          <SubmitBtn />
          <LeaveAccount>회원 탈퇴</LeaveAccount>
        </ModifyMain>
      </BackGround>
    </>
  );
};

export default MyPageModify;

const BackGround = tw.div`
    w-full h-full bg-white overflow-scroll 
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
    border: 1px solid #d9d9d9;
    border-radius: 50px;
    object-fit: cover;
  }
`;

const HiddenInput = styled.input`
  display: none;
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

const NameBox = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 70px;
  text-align: center;
  input {
    color: #003366;
    text-align: center;
    font-size: 25px;
    width: 200px;
    padding-bottom: 10px;
    border-bottom: 3px solid #d9d9d9;
  }
`;

const EmailCheckBox = tw.div`
  w-full
  mt-11
`;

const EmailInfo = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
`;

const TypeImg = styled.div`
  height: 40px;
  width: 40px;
  background-image: url("/img/test/너굴맨레시피.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: auto 10px;
  border-radius: 5px;
`;

const EmailText = styled.div`
  height: 40px;
  margin: auto 0px;
  line-height: 40px;
  color: #003366;
`;

const EmailAgree = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 24px;
  margin-top: 10px;
  input {
    width: 20px;
    height: 20px;
    margin-top: 3.5px;
    margin-left: 10px;
  }
`;

const AgreeText = tw.div`
  text-[20px]
  text-common-text-color
`;

const EmailGuide = tw.div`
  text-center
  text-[14px]
  w-[350px]
  mt-4
  text-common-text-gray-color
  mx-auto
`;

const SubmitBtn = styled.div`
  width: 270px;
  height: 66px;
  background-image: url("/img/btn/modify-btn.png");
  background-size: 270px 66px;
  background-repeat: no-repeat;
  background-position: center;
  margin: 100px auto 0px auto;
`;

const LeaveAccount = tw.div`
w-[100px]
text-[18px]
text-center
mx-auto
mt-6
text-common-text-gray-color
pb-16
`;
