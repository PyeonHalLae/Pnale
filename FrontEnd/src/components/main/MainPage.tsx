import Header from "@components/common/Header";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainPage;
