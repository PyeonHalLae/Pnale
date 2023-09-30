import SearchArea from "./SearchArea";
import RelatedArea from "./RelatedArea";
import RecipeArea from "./RecipeArea";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchData } from "@/model/searchType";

const SearchMain = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState<searchData>();

  useEffect(() => {
    if (location.state) {
      const searchData = location.state;
      setSearchData(searchData);
    }
  }, [location.state]);

  return (
    <div className="grid-cols-3 gird bg-common-back-color">
      {searchData && (
        <>
          <SearchArea search={searchData.search} />
          <RelatedArea relate={searchData.relate} />
          <RecipeArea recipes={searchData.recipes} />
        </>
      )}
    </div>
  );
};

export default SearchMain;
