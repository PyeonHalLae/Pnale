import SearchArea from "./SearchArea";
import RelatedArea from "./RelatedArea";
import RecipeArea from "./RecipeArea";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchData } from "@/model/searchType";
import { useRecoilValue } from "recoil";
import { searchIdsArray } from "@/recoil/kdmRecoil";

const SearchMain = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState<searchData>();
  const IdsArray = useRecoilValue(searchIdsArray);

  useEffect(() => {
    if (location.state) {
      const searchData = location.state.responseData;
      setSearchData(searchData);
      console.log("searchData", searchData);
      console.log("@@@@@@@@@@@@@", IdsArray);
    }
  }, [location.state, IdsArray]);

  return (
    <div className="grid-cols-3 gird bg-common-back-color">
      {searchData && (
        <>
          <SearchArea search={searchData.search} ids={IdsArray} />
          <RelatedArea relate={searchData.relate} />
          <RecipeArea recipe={searchData.recipes} />
        </>
      )}
    </div>
  );
};

export default SearchMain;
