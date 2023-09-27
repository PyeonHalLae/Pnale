import { useNavigate } from "react-router-dom";

import MainProduct from "./mainProduct/MainProduct";
import MainRecipe from "./mainRecipe/MainRecipe";
import tw from "tailwind-styled-components";

const MainPageContent = () => {
  const navigate = useNavigate();

  return (
    <MainPage>
      <MainRecipe />
      <img src="/img/etc/eventBanner.png" onClick={() => navigate("/pyenEevent")}></img>
      <MainProduct />
    </MainPage>
  );
};

export default MainPageContent;

const MainPage = tw.div`
animate-moveToRight
`;
