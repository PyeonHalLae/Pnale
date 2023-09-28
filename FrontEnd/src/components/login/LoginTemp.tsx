// import React from "react";

import axios from "axios";
import { useEffect } from "react";

const LoginTemp = () => {
  useEffect(() => {
    axios
      .get("/api/member/login", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <></>;
};

export default LoginTemp;
