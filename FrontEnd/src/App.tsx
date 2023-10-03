import { Route, Routes } from "react-router-dom";
import Modal from "react-modal";
//공통 라우더
import NotFound from "@components/common/NotFound";
import Navi from "@components/common/Navi";

//김동민 라우터
import MainPage from "@components/main/MainPage";
import MainPageContent from "@components/main/MainPageContent";
import SearchMain from "@components/search/SearchMain";
import MoreProduct from "@components/search/detail/MoreProduct";
import MoreRelated from "@components/search/detail/MoreRelated";
import MoreRecipe from "@components/search/detail/MoreRecipe";

//정현모 라우터
import MyPage from "@components/mypage/MyPage";
import MyPageUser from "@components/mypage/MyPageUser";
import MyPageProduct from "@components/mypage/MyPageProduct";
import MyPageRecipe from "@components/mypage/MyPageRecipe";
import MyPageModify from "@components/mypage/MyPageModify";
import MyPageComment from "@components/mypage/MyPageComment";
import Pyene from "@components/pyunE/Pyene";
import PyeneShop from "@components/pyunE/PyeneShop";
import PyeneEvent from "@components/pyunE/PyeneEvent";
import PyeneEventList from "@components/pyunE/PyeneEventList";
import PyeneEventDetail from "@components/pyunE/PyeneEventDetail";
import LoginMain from "@components/login/LoginMain";
import LoginTemp from "@components/login/LoginTemp";

//김효인 라우터
import Recipe from "@components/recipe/Recipe";
import RecipeList from "@components/recipe/RecipeList";
import RecipeCreate from "@components/recipe/RecipeCreate";
import RecipeDetail from "@components/recipe/RecipeDetail";
import RecipeSearch from "./components/recipe/RecipeSearch";
import RecipeModify from "./components/recipe/RecipeModify";

//임시
import NotLogin from "@components/common/NotLogin";
import SearchInput from "@components/search/SearchInput";

function App() {
  Modal.setAppElement("#root");

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
              <Route path="search/what" element={<SearchInput />} />
              <Route path="search" element={<SearchMain />} />
              <Route path="search-product" element={<MoreProduct />} />
              <Route path="search-related" element={<MoreRelated />} />
              <Route path="search-recipe" element={<MoreRecipe />} />
            </Route>
            {/* 정현모 개발 페이지*/}
            <Route path="mypage/*" element={<MyPage />}>
              <Route index element={<MyPageUser />} />
              <Route path="product" element={<MyPageProduct />} />
              <Route path="recipe" element={<MyPageRecipe />} />
              <Route path="modify" element={<MyPageModify />} />
              <Route path="comment" element={<MyPageComment />} />
            </Route>

            {/* 편의점 페이지 */}
            <Route path="pyenE/*" element={<Pyene />}>
              <Route path=":pyenType" element={<PyeneShop />} />
              <Route path=":pyenType/event/*" element={<PyeneEvent />}>
                <Route index element={<PyeneEventList />} />
                <Route path=":eventId" element={<PyeneEventDetail />} />
              </Route>
            </Route>

            {/* 로그인 페이지 */}
            <Route path="loginPage" element={<LoginMain />}></Route>
            <Route path="temp" element={<LoginTemp />}></Route>

            {/* 김효인 개발 페이지*/}
            <Route path="recipe" element={<Recipe />}>
              <Route path="" element={<RecipeList />} />
              <Route path="create" element={<RecipeCreate />} />
              <Route path="search" element={<RecipeSearch />} />
              <Route path=":recipeId" element={<RecipeDetail />} />
              <Route path=":recipeId/modify" element={<RecipeModify />} />
            </Route>
          </Route>

          {/* 예외 처리 페이지*/}
          <Route element={<Navi />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </>
      ) : (
        <>
          <Route element={<Navi />}>
            <Route path="*" element={<NotLogin />} />
          </Route>
        </>
      )}
    </Routes>
  );
}
export default App;
