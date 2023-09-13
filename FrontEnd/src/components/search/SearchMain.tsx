import { useNavigate } from "react-router-dom";

const SearchMain = () => {
  const navigate = useNavigate();

  return (
    <>
      <button style={{ backgroundColor: "orange" }} onClick={() => navigate("/search-product")}>
        검색상품 더보기
      </button>
      <button style={{ backgroundColor: "gray" }} onClick={() => navigate("/search-related")}>
        관련상품 더보기
      </button>
      <button style={{ backgroundColor: "olive" }} onClick={() => navigate("/search-recipe")}>
        레시피 더보기
      </button>
    </>
  );
};

export default SearchMain;
