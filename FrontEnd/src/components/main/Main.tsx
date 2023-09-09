import { Route, Routes } from "react-router-dom";
import Main2 from "./main2/Main2";

const Main = () => {
  return (
    <>
      <div className="bg-orange-600">Main</div>
      <Routes>
        <Route path="main2" element={<Main2 />} />
      </Routes>
    </>
  );
};

export default Main;
