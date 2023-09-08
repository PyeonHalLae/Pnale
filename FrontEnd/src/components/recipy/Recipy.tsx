import { Route, Routes } from "react-router-dom";
import Recipy2 from "./recipy2/Recipy2";

const Recipy = () => {
  return (
    <div>
      Recipy
      <Routes>
        <Route path="recipy2" element={<Recipy2 />} />
      </Routes>
    </div>
  );
};

export default Recipy;
