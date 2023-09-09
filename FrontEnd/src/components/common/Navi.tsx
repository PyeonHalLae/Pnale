// src/Layout.tsx
import { Outlet } from "react-router-dom";

export default function Navi() {
  return (
    <div>
      <div>헤더야 임마 페이지를 바꿔도 깜박거리지 않지</div>
      <Outlet />
    </div>
  );
}
