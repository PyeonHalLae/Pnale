// import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { MemberInfo } from "@/recoil/memberRecoil";
("@/recoil/memberRecoil");

const LoginTemp = () => {
  const navigate = useNavigate();
  const setMemberInfo = useSetRecoilState(MemberInfo);
  const resetMemberInfo = useResetRecoilState(MemberInfo);

  useEffect(() => {
    axios
      .get("/api/member/login", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          setMemberInfo({ member: res.data.data });
          console.log(MemberInfo, "저장후");
          navigate("/main");
        } else {
          resetMemberInfo();
          navigate("/mypage");
        }
      })
      .catch((err) => {
        console.log(err);
        resetMemberInfo();
        navigate("/mypage");
      });
  });

  return <></>;
};

export default LoginTemp;
