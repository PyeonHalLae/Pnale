// src/Layout.tsx
import { Outlet } from "react-router-dom";

export default function Navi() {
  return (
    <div>
      <Outlet />
      <div>
        <img src="/img/navi/home-gray.png" alt="" />
        <img src="/img/navi/search-gray.png" alt="" />
        <img src="/img/navi/trophy-gray.png" alt="" />
        <img src="/img/navi/recipy-gray.png" alt="" />
        <img src="/img/navi/user-gray.png" alt="" />
      </div>
    </div>
  );
}
