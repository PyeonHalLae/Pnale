export type IconState = {
  home: "blue" | "gray";
  search: "blue" | "gray";
  pyenE: "blue" | "gray";
  recipe: "blue" | "gray";
  mypage: "blue" | "gray";
};

export type NavItem = {
  icon: string;
  path: string;
  label: string;
};

export const navItems: NavItem[] = [
  { icon: "home", path: "/home", label: "홈" },
  { icon: "search", path: "/search", label: "검색" },
  { icon: "pyenE", path: "/pyenE", label: "편의점" },
  { icon: "recipe", path: "/recipe", label: "레시피" },
  { icon: "mypage", path: "/mypage", label: "마이" },
];
