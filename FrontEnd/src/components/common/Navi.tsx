import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

interface IconState {
  home: "blue" | "gray";
  search: "blue" | "gray";
  pyenE: "blue" | "gray";
  recipy: "blue" | "gray";
  mypage: "blue" | "gray";
}

export default function Navi() {
  const location = useLocation();
  const navigate = useNavigate();

  const [iconState, setIconState] = useState<IconState>({
    home: location.pathname === "/" ? "blue" : "gray",
    search: location.pathname.startsWith("/search") ? "blue" : "gray",
    pyenE: location.pathname.startsWith("/pyenE") ? "blue" : "gray",
    recipy: location.pathname.startsWith("/recipy") ? "blue" : "gray",
    mypage: location.pathname.startsWith("/mypage") ? "blue" : "gray",
  });

  useEffect(() => {
    const updatedIconState: IconState = {
      home: location.pathname === "/" ? "blue" : "gray",
      search: location.pathname.startsWith("/search") ? "blue" : "gray",
      pyenE: location.pathname.startsWith("/pyenE") ? "blue" : "gray",
      recipy: location.pathname.startsWith("/recipy") ? "blue" : "gray",
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
      <div style={{ minHeight: "calc(100vh - 60px)" }}>
        <Outlet />
      </div>
      <NaviParent>
        <NaviDiv>
          <NaviIcon
            src={`/img/navi/home-${iconState.home}.png`}
            alt=""
            onClick={() => toggleIconColor("home")}
          />
          <NaviText isActive={location.pathname === "/"}>홈</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon
            src={`/img/navi/search-${iconState.search}.png`}
            alt=""
            onClick={() => toggleIconColor("search")}
          />
          <NaviText isActive={location.pathname.startsWith("/search")}>검색</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon
            src={`/img/navi/pyenE-${iconState.pyenE}.png`}
            alt=""
            onClick={() => toggleIconColor("pyenE")}
          />
          <NaviText isActive={location.pathname.startsWith("/pyenE")}>편의점</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon
            src={`/img/navi/recipy-${iconState.recipy}.png`}
            alt=""
            onClick={() => toggleIconColor("recipy")}
          />
          <NaviText isActive={location.pathname.startsWith("/recipy")}>레시피</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon
            src={`/img/navi/user-${iconState.mypage}.png`}
            alt=""
            onClick={() => toggleIconColor("mypage")}
          />
          <NaviText isActive={location.pathname.startsWith("/mypage")}>마이</NaviText>
        </NaviDiv>
      </NaviParent>
    </>
  );
}

const NaviParent = tw.div`
  flex
  h-[60px]
  min-w-[360px]
  w-full
  justify-center
  gap-4
  sticky
  bottom-0
  bg-white
`;

const NaviDiv = tw.div`
  w-12
  mb-1
`;

const NaviIcon = tw.img`
  mb-1
  mx-auto
  w-9
  h-9
`;

const NaviText = tw.p<{ isActive: boolean }>`
  text-sm
  text-center
  ${(props) => (props.isActive ? "text-common-text-color" : "text-common-text-gray-color")}
`;
