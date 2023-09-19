import SearchArea from "./SearchArea";
import RelatedArea from "./RelatedArea";
import RecipeArea from "./RecipeArea";

const SearchMain = () => {
  return (
    <div className="grid-cols-3 gird bg-common-back-color">
      {/* <button style={{ backgroundColor: "orange" }} onClick={() => navigate("/search-product")}>
        검색상품 더보기
      </button>
      <button style={{ backgroundColor: "gray" }} onClick={() => navigate("/search-related")}>
        관련상품 더보기
      </button>
      <button style={{ backgroundColor: "olive" }} onClick={() => navigate("/search-recipe")}>
        레시피 더보기
      </button> */}
      <SearchArea />
      <RelatedArea />
      <RecipeArea />
    </div>
  );
};

export default SearchMain;
