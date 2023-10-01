import SearchArea from "./SearchArea";
import RelatedArea from "./RelatedArea";
import RecipeArea from "./RecipeArea";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchData } from "@/model/searchType";

const SearchMain = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState<searchData>();
  const [ids, setIds] = useState<number>();
  useEffect(() => {
    if (location.state) {
      const searchData = location.state.responseData;
      const ids = location.state.idsArray;
      setSearchData(searchData);
      setIds(ids);
      console.log("searchData", location.state);
    }
  }, [location.state]);

  return (
    <div className="grid-cols-3 gird bg-common-back-color">
      {searchData && (
        <>
          <SearchArea search={searchData.search} ids={ids} />
          <RelatedArea relate={searchData.relate} />
          <RecipeArea recipes={searchData.recipes} />
        </>
      )}
    </div>
  );
};

export default SearchMain;
