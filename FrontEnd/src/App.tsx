import { Route, Routes } from "react-router-dom";

//공통 라우더
import NotFound from "@components/common/NotFound";
import Navi from "@components/common/Navi";

//김동민 라우터
import Main from "@components/main/Main";
import SearchTest from "@components/search/SearchTest";
//정현모 라우터
import MyPageTest from "@components/mypage/MyPageTest";
import PyenE from "@components/pyunE/PyenE";

//김효인 라우터
import Recipy from "@components/recipy/Recipy";
import Recipy2 from "@components/recipy/recipy2/Recipy2";

function App() {
  console.log("시작");
  console.log(
    "한번 실행했는데 로그가 두번 찍히는 이유는 App의 rescticMode가 있기 때문에 installHook이 발생"
  );
  console.log(
    "이는 마운트를 두번 실행해도 문제가 없어야 정상적인 로직이기 때문에 안정성 검사를 하는 것과 같다."
  );
  console.log("지워도 상관은 없는데 일단 냅둠");

  return (
    <Routes>
      <Route element={<Navi />}>
        {/* 김동민 개발 페이지*/}
        <Route path="/" element={<Main />} />
        <Route path="search/*" element={<SearchTest />} />
        {/* 정현모 개발 페이지*/}
        <Route path="mypage/*" element={<MyPageTest />} />
        <Route path="pyenE/*" element={<PyenE />} />
        {/* 김효인 개발 페이지*/}
        <Route path="recipy" element={<Recipy />}>
          <Route path="recipy2" element={<Recipy2 />} />
        </Route>
      </Route>

      {/* 예외 처리 페이지*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
