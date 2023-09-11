import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { testState } from "@/recoil/kdmRecoil";

const SearchTest = () => {
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

  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <div>SearchaaTest</div>
      <button onClick={handleIncrement}>Increment</button>

      <div>{testValue?.test1}</div>
      <button onClick={back}>뒤로가기</button>
      <Outlet />
    </>
  );
};

export default SearchTest;
