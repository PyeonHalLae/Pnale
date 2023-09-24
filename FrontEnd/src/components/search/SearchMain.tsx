import SearchArea from "./SearchArea";
import RelatedArea from "./RelatedArea";
import RecipeArea from "./RecipeArea";

const SearchMain = () => {
  return (
    <div className="grid-cols-3 gird bg-common-back-color">
      <SearchArea />
      <RelatedArea />
      <RecipeArea />
    </div>
  );
};

export default SearchMain;
