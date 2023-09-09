import { Route, Routes } from "react-router-dom";
import PyenE2 from "./pyunE2/PyenE2";

const PyenE = () => {
  return (
    <div>
      PyenE
      <Routes>
        <Route path="pyenE2" element={<PyenE2 />} />
      </Routes>
    </div>
  );
};

export default PyenE;
