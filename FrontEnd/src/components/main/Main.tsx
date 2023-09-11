import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div className="bg-orange-600">Main</div>
      <Outlet />
    </>
  );
};

export default Main;
