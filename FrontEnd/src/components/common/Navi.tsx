import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import NaviPE from "./NaviPE";

interface IconState {
  home: "blue" | "gray";
  search: "blue" | "gray";
  pyenE: "blue" | "gray";
  recipe: "blue" | "gray";
  mypage: "blue" | "gray";
}

export default function Navi() {
  const location = useLocation();
  const navigate = useNavigate();

  const [iconState, setIconState] = useState<IconState>({
    home: location.pathname === "/" ? "blue" : "gray",
    search: location.pathname.startsWith("/search") ? "blue" : "gray",
    pyenE: location.pathname.startsWith("/pyenE") ? "blue" : "gray",
    recipe: location.pathname.startsWith("/recipe") ? "blue" : "gray",
    mypage: location.pathname.startsWith("/mypage") ? "blue" : "gray",
  });

  useEffect(() => {
    const updatedIconState: IconState = {
      home: location.pathname === "/" ? "blue" : "gray",
      search: location.pathname.startsWith("/search") ? "blue" : "gray",
      pyenE: location.pathname.startsWith("/pyenE") ? "blue" : "gray",
      recipe: location.pathname.startsWith("/recipe") ? "blue" : "gray",
      mypage: location.pathname.startsWith("/mypage") ? "blue" : "gray",
    };
    setIconState(updatedIconState);
  }, [location.pathname]);

  const toggleIconColor = (iconName: keyof IconState) => {
    setIconState((prevState) => ({
      ...prevState,
      [iconName]: "gray",
    }));
    if (iconName === "home") {
      navigate("/");
    } else {
      navigate(`/${iconName}`);
    }
  };

  return (
    <>
      <div style={{ height: "calc(100vh - 60px)" }} className="overflow-y-scroll ">
        <Outlet />
      </div>
      <NaviParent>
        <NaviDiv $isActive={location.pathname === "/"}>
          <NaviIcon
            src={`/img/navi/home-${iconState.home}.png`}
            alt=""
            onClick={() => toggleIconColor("home")}
          />
          <NaviText $isActive={location.pathname === "/"}>홈</NaviText>
        </NaviDiv>
        <NaviDiv $isActive={location.pathname.startsWith("/search")}>
          <NaviIcon
            src={`/img/navi/search-${iconState.search}.png`}
            alt=""
            onClick={() => toggleIconColor("search")}
          />
          <NaviText $isActive={location.pathname.startsWith("/search")}>검색</NaviText>
        </NaviDiv>
        {/* 편의점 메인 버튼 */}
        <NaviPE iconState={iconState.pyenE} />
        {/* 편의점 메인 버튼 */}
        <NaviDiv $isActive={location.pathname.startsWith("/recipe")}>
          <NaviIcon
            src={`/img/navi/recipe-${iconState.recipe}.png`}
            alt=""
            onClick={() => toggleIconColor("recipe")}
          />
          <NaviText $isActive={location.pathname.startsWith("/recipe")}>레시피</NaviText>
        </NaviDiv>
        <NaviDiv $isActive={location.pathname.startsWith("/mypage")}>
          <NaviIcon
            src={`/img/navi/user-${iconState.mypage}.png`}
            alt=""
            onClick={() => toggleIconColor("mypage")}
          />
          <NaviText $isActive={location.pathname.startsWith("/mypage")}>마이</NaviText>
        </NaviDiv>
      </NaviParent>
    </>
  );
}

const NaviParent = tw.div`
  flex
  h-[60px]
  max-w-[450px]
  min-w-[350px]
  w-full
  justify-center
  gap-[2em]
  fixed
  bottom-0
  bg-white
`;

const NaviDiv = tw.div<{ $isActive: boolean }>`
  w-11
  mb-1
  ${(props) =>
    props.$isActive ? "border-t-4 border-common-text-color" : "border-t-4 border-white"}
  `;

const NaviIcon = tw.img`
  mx-auto
  w-6.5
  h-7
mt-1.5
`;

const NaviText = tw.p<{ $isActive: boolean }>`
  text-sm
  text-center
  mt-1
  ${(props) => (props.$isActive ? "text-common-text-color" : "text-common-text-gray-color")}
`;
