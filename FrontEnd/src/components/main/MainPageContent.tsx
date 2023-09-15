import { useNavigate } from "react-router-dom";

import MainProduct from "./mainProduct/MainProduct";
import MainRecipe from "./mainRecipe/MainRecipe";

const MainPageContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainRecipe />
      <img src="/img/etc/eventBanner.png" onClick={() => navigate("/pyenEevent")}></img>
      <MainProduct />
    </>
  );
};

export default MainPageContent;
