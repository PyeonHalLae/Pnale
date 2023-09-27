import React from "react";
import { useNavigate } from "react-router-dom";

const CancelBtn = () => {
  const navigate = useNavigate();
  const cancleBtn = () => {
    navigate("/recipe");
  };
  return (
    <div
      className="absolute top-[-2rem] right-[2.5rem] text-[1.25rem] text-common-text-color"
      onClick={cancleBtn}
    >
      작성 취소
    </div>
  );
};

export default CancelBtn;
