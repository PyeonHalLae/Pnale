import Header from "@components/common/Header";
import { Outlet } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { sessionState } from "@/recoil/kdmRecoil";
// import { localState } from "@/recoil/kdmRecoil";
// import styled from "styled-components";

// interface TestState {
//   test1: number;
//   test2: string;
// }

const MainPage = () => {
  // const [testValue2, setTestValue2] = useRecoilState(localState);
  // const [testValue1, setTestValue1] = useRecoilState(sessionState);

  // const handleIncrement = () => {
  //   setTestValue1((prevValue: TestState | null) => {
  //     if (!prevValue) {
  //       // prevValue가 null 또는 undefined인 경우 초기 상태를 반환
  //       return { test1: 0 };
  //     }
  //     return {
  //       ...prevValue,
  //       test1: (prevValue.test1 || 0) + 1, // test1 값을 1 증가시킵니다.
  //     };
  //   });
  // };

  // const handleText = () => {
  //   setTestValue2((preValue: TestState | null) => {
  //     if (!preValue) {
  //       return { test2: "a" };
  //     }
  //     return {
  //       ...preValue,
  //       test2: (preValue.test2 || "a") + "a",
  //     };
  //   });
  // };

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainPage;
