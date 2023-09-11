import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { testState } from "@/recoil/kdmRecoil";

const MainPage = () => {
  const [testValue, setTestValue] = useRecoilState(testState);
  const navigate = useNavigate();

  const handleIncrement = () => {
    setTestValue((prevValue) => {
      if (!prevValue) {
        // prevValue가 null 또는 undefined인 경우 초기 상태를 반환
        return { test1: 0, test2: "" };
      }
      return {
        ...prevValue,
        test1: (prevValue.test1 || 0) + 1, // test1 값을 1 증가시킵니다.
      };
    });
  };
  const moving = () => {
    // 페이지 이동 처리
    navigate("/search"); // '/search' 페이지로 이동
  };
  return (
    <>
      <div className="bg-orange-600">Maiaaan</div>
      <button onClick={handleIncrement}>Increment</button>
      <div>{testValue?.test1}</div>
      <button onClick={moving}>페이지 이동</button>

      <Outlet />
    </>
  );
};

export default MainPage;
