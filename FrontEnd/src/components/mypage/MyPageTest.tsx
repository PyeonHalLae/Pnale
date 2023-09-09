import { Route, Routes } from "react-router-dom";
import MyPageTest2 from "./mypage2/MyPageTest2";

const MyPageTest = () => {
  return (
    <div>
      MyPageTest
      <Routes>
        <Route path="mypage2" element={<MyPageTest2 />} />
      </Routes>
    </div>
  );
};

export default MyPageTest;
