import { Route, Routes } from "react-router-dom";

//공통 라우더
import NotFound from "@components/common/NotFound";
import Navi from "@components/common/Navi";

//김동민 라우터
import MainPage from "@components/main/MainPage";
import MainPageContent from "@components/main/MainPageContent";
import SearchMain from "@components/search/SearchMain";
import SearchProduct from "@components/search/SearchProduct";
import SearchRelated from "@components/search/SearchRelated";
import SearchRecipe from "@components/search/SearchRecipe";

//정현모 라우터
import MyPage from "@components/mypage/MyPage";
import MyPageUser from "@components/mypage/MyPageUser";
import PyenE from "@components/pyunE/PyenE";
import MyProduct from "@components/mypage/MyProduct";

//김효인 라우터
import Recipe from "@components/recipe/Recipe";
import RecipeList from "@components/recipe/RecipeList";

//몰라몰라
import PyenEvent from "@components/pyunE/PyenEvent";
import NotLogin from "@components/common/NotLogin";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  const isAuthenticated = true;
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route element={<Navi />}>
            {/* 김동민 개발 페이지*/}
            <Route index element={<MainPageContent />} />
            <Route path="/" element={<MainPage />}>
              <Route path="search" element={<SearchMain />} />
              <Route path="search-product" element={<SearchProduct />} />
              <Route path="search-related" element={<SearchRelated />} />
              <Route path="search-recipe" element={<SearchRecipe />} />
            </Route>
            {/* 정현모 개발 페이지*/}
            <Route path="mypage/*" element={<MyPage />}>
              <Route index element={<MyPageUser />} />
              <Route path="product" element={<MyProduct />} />
            </Route>
            <Route path="pyenEevent" element={<PyenEvent />} />
            <Route path="pyenE" element={<PyenE />} />
            {/* 김효인 개발 페이지*/}
            <Route path="recipe" element={<Recipe />}>
              <Route path="" element={<RecipeList />} />
            </Route>
          </Route>

          {/* 예외 처리 페이지*/}
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route element={<Navi />}>
            <Route path="/" element={<NotLogin />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
