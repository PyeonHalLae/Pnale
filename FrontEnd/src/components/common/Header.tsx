import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const searchBtn = () => {
    // 페이지 이동 처리
    navigate("/search"); // '/search' 페이지로 이동
  };
  return (
    <>
      <div>아이콘</div>
      <input type="text" />
      <button onClick={searchBtn}>검색</button>
    </>
  );
};

export default Header;
