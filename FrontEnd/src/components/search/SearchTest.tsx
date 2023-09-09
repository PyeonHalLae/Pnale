import { Route, Routes } from "react-router-dom";
import SearchTest2 from "./search2/SearchTest2";

const SearchTest = () => {
  return (
    <>
      <div>SearchTest</div>
      <Routes>
        <Route path="search2" element={<SearchTest2 />} />
      </Routes>
    </>
  );
};

export default SearchTest;
