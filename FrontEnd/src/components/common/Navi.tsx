// src/Layout.tsx
import { Outlet } from "react-router-dom";
import tw from "tailwind-styled-components";

export default function Navi() {
  return (
    <div>
      <Outlet />
      <NaviParent>
        <NaviDiv>
          <NaviIcon src="/img/navi/home-gray.png" alt="" />
          <NaviText>홈</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon src="/img/navi/search-gray.png" alt="" />
          <NaviText>검색</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon src="/img/navi/trophy-gray.png" alt="" />
          <NaviText>편의점</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon src="/img/navi/recipy-gray.png" alt="" />
          <NaviText>레시피</NaviText>
        </NaviDiv>
        <NaviDiv>
          <NaviIcon src="/img/navi/user-gray.png" alt="" />
          <NaviText>마이</NaviText>
        </NaviDiv>
      </NaviParent>
    </div>
  );
}

const NaviParent = tw.div`
flex
min-h-[48px]
max-h-[60px]
min-w-[360px]
w-auto
justify-center
gap-4
absolute
bottom-0
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

const NaviText = tw.p`
text-sm
text-center
text-commont-text-gray-color
text-cu
`;
