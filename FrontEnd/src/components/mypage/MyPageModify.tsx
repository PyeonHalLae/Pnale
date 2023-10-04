// import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastBackMessage, UserInfoExpires, UserNotLogin } from "@/model/toastMessageJHM";
import MyPage from "./MyPage";

interface UserInfoType {
  memberId: number;
  nickname: string;
  socialType: string;
  email: string;
  memberImg: string;
  mailRecieve: boolean;
}

const MyPageModify = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>();
  const [userImgSrc, setUserImgSrc] = useState<string>();
  const [userinfo, setUserInfo] = useState<UserInfoType>();

  const mailState = useRef(null);

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

  const UpdateUserInfo = () => {
    const fileImg = inputFileRef.current;

    let redirectFile = null;
    if (fileImg && fileImg.files.length > 0) {
      redirectFile = fileImg.files[0];
    }

    const formData = new FormData();

    if (redirectFile) {
      formData.append("image", redirectFile);
    }

    const additionalData = {
      nickname: userName,
      emailReceive: mailState.current.checked,
    };

    formData.append("additionalData", JSON.stringify(additionalData));

    axios
      .patch("/api/member/update", { withCredentials: true })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          ToastBackMessage(resData.message);
          navigate("/mypage");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          //리프레시 토큰 재발급
          axios
            .get("/api/auth/member/update", {
              withCredentials: true,
            })
            .then((res) => {
              //재발급이 잘되서 정보를 받아온경우
              const resData = res.data;
              if (resData.code == 200) {
                ToastBackMessage(resData.message);
                navigate("/mypage");
              }
            })
            .catch((err) => {
              if (err.response.status === 403) {
                //제발급 실패! 재로그인 해주세요!!
                UserInfoExpires();
                navigate("/mypage");
              } else {
                console.log("서버 오류 발생");
              }
            });
        } else {
          if (err.response.status === 403) {
            //처음부터 토큰이 없는경우 ! 로그인화면 보여준다
            UserNotLogin();
            navigate("/mypage");
          } else {
            //그외 서버 오류
            console.log("서버 오류 발생");
          }
        }
      });
  };

  useEffect(() => {
    axios
      .get("/api/member/login", {
        withCredentials: true,
      })
      .then((res) => {
        const resData = res.data;
        if (resData.code == 200) {
          setUserInfo(resData.data);
          setUserName(resData.data.nickname);
          setUserImgSrc(resData.data.memberImg);
        }
      })
      .catch((err) => {
        if (err.code === 401) {
          //리프레시 토큰 재발급
          axios
            .get("/api/auth/member/login", {
              withCredentials: true,
            })
            .then((res) => {
              //재발급이 잘되서 정보를 받아온경우
              const resData = res.data;
              if (resData.code == 200) {
                setUserInfo(resData.data);
                setUserName(resData.data.nickname);
                setUserImgSrc(resData.data.memberImg);
              }
            })
            .catch((err) => {
              if (err.code === 403) {
                //제발급 실패! 재로그인 해주세요!!
                UserInfoExpires();
                setUserInfo(null);
                navigate("/mypage");
              } else {
                console.log("서버 오류 발생");
              }
            });
        } else {
          if (err.code === 403) {
            //처음부터 토큰이 없는경우 ! 로그인화면 보여준다
            UserNotLogin();
            setUserInfo(null);
            navigate("/mypage");
          } else {
            console.log("서버 오류 발생");
          }
        }
      });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      {userinfo && (
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
                <TypeImg $socialType={userinfo.socialType} />
                <EmailText>{userinfo.email}</EmailText>
              </EmailInfo>
              <EmailAgree>
                <AgreeText>메일 전송 수신 동의 </AgreeText>
                <input type="checkbox" checked={userinfo.mailRecieve} ref={mailState} />
              </EmailAgree>
              <EmailGuide>
                메일 전송 수신 동의를 하실 경우 관심상품의 행사 정보를 메일로 받을수 있습니다
              </EmailGuide>
            </EmailCheckBox>
            <SubmitBtn onClick={() => UpdateUserInfo()} />
            <LeaveAccount>회원 탈퇴</LeaveAccount>
          </ModifyMain>
        </BackGround>
      )}
    </>
  );
};

export default MyPageModify;

const BackGround = tw.div`
    w-full h-full bg-white overflow-scroll 
`;

const ModifyHeader = tw.div`
    h-[5.0625rem]
`;

const ModifyMain = tw.div`
    h-[calc(100%-81px)]
    w-full
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

const Title = tw.div`
    mx-auto
    text-[1.5625rem]
    text-center
    text-common-text-color
`;

const ProfileImg = styled.div`
  margin: 2rem auto 0rem auto;
  width: 8rem;
  height: 8rem;
  /* border: 1px solid black; */
  position: relative;
  img {
    margin: 0.1875rem auto;
    width: 7.625rem;
    height: 7.625rem;
    border: 0.0625rem solid #d9d9d9;
    border-radius: 3.125rem;
    object-fit: cover;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImgChangBtn = styled.div`
  position: absolute;
  bottom: 0.25rem;
  right: -0.3125rem;
  margin-top: calc(100% - 2.375rem);
  width: 2.5rem;
  height: 2.1875rem;
  background-image: url("/img/btn/profile-chang-btn.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const NameBox = styled.div`
  width: 100%;
  height: 3.125rem;
  margin-top: 4.375rem;
  text-align: center;
  input {
    color: #003366;
    text-align: center;
    font-size: 1.5625rem;
    width: 12.5rem;
    padding-bottom: 0.625rem;
    border-bottom: 0.1875rem solid #d9d9d9;
  }
`;

const EmailCheckBox = tw.div`
  w-full
  mt-11
`;

const EmailInfo = styled.div`
  height: 3.125rem;
  display: flex;
  justify-content: center;
`;

const TypeImg = styled.div<{ $socialType: string }>`
  height: 2.5rem;
  width: 2.5rem;
  background-image: url("/img/icons/${(props) => props.$socialType}-smail-icon.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: auto 0.625rem;
  border-radius: 0.3125rem;
`;

const EmailText = styled.div`
  height: 2.5rem;
  margin: auto 0rem;
  line-height: 2.5rem;
  color: #003366;
`;

const EmailAgree = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 1.5rem;
  margin-top: 0.625rem;
  input {
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.2188rem;
    margin-left: 0.625rem;
  }
`;

const AgreeText = tw.div`
  text-[1.25rem]
  text-common-text-color
`;

const EmailGuide = tw.div`
  text-center
  text-[0.875rem]
  w-[21.875rem]
  mt-4
  text-common-text-gray-color
  mx-auto
`;

const SubmitBtn = styled.div`
  width: 16.875rem;
  height: 4.125rem;
  background-image: url("/img/btn/modify-btn.png");
  background-size: 16.875rem 4.125rem;
  background-repeat: no-repeat;
  background-position: center;
  margin: 6.25rem auto 0rem auto;
`;

const LeaveAccount = tw.div`
w-[6.25rem]
text-[1.125rem]
text-center
mx-auto
mt-6
text-common-text-gray-color
pb-16
`;
