import { Route, Routes } from "react-router-dom";

//공통 라우더
import NotFound from "@components/common/NotFound";
import Navi from "@components/common/Navi";

//김동민 라우터
import Main from "@components/main/Main";
import Main2 from "@components/main/main2/Main2";
import SearchTest from "@components/search/SearchTest";
import SearchTest2 from "@components/search/search2/SearchTest2";
//정현모 라우터
import MyPageTest from "@components/mypage/MyPageTest";
import MyPageTest2 from "@components/mypage/mypage2/MyPageTest2";
import PyenE from "@components/pyunE/PyenE";
import PyenE2 from "@components/pyunE/pyunE2/PyenE2";

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
    <>
      <Routes>
        <Route element={<Navi />}>
          {/* 김동민 개발 페이지*/}
          <Route path="/" element={<Main />}>
            <Route path="/main/main2" element={<Main2 />} />
          </Route>
          <Route path="/search" element={<SearchTest />}>
            <Route path="/search/search2" element={<SearchTest2 />} />
          </Route>
          {/* 정현모 개발 페이지*/}
          <Route path="/mypage" element={<MyPageTest />}>
            <Route path="/mypage/mypage2" element={<MyPageTest2 />} />
          </Route>
          <Route path="/pyenE" element={<PyenE />}>
            <Route path="/pyenE/pyenE2" element={<PyenE2 />} />
          </Route>
          {/* 김효인 개발 페이지*/}
          <Route path="/recipy" element={<Recipy />}>
            <Route path="/recipy/recipy2" element={<Recipy2 />} />
          </Route>
        </Route>

        {/* 예외 처리 페이지*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
