import SearchArea from "./SearchArea";
import RelatedArea from "./RelatedArea";
import RecipeArea from "./RecipeArea";
import { useLocation } from "react-router-dom";

const SearchMain = () => {
  const location = useLocation();
  const searchData = location.state;
  console.log("검색결과 전달 받음", searchData);

  return (
    <div className="grid-cols-3 gird bg-common-back-color">
      <SearchArea />
      <RelatedArea />
      <RecipeArea />
    </div>
  );
};

export default SearchMain;
