import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const { persistAtom: persistAtom1 } = recoilPersist({
//   key: "recoil-persist-session",
//   storage: sessionStorage, // 세션 스토리지 사용
// });

const { persistAtom: persistAtom2 } = recoilPersist({
  key: "recoil-persist-local", //로컬 스토리지 사용
  storage: localStorage,
});

//검색어 저장
export const searchInputData = atom({
  key: "searchInputData",
  default: { input: "" },
});

//검색 결과 제품 id 저장
export const searchIdsArray = atom<number[]>({
  key: "searchIdsArray",
  default: [],
});

//최근 검색어 저장
export const storedToSearchTag = atom<string[]>({
  key: "storedToSearchTag",
  default: [],
  effects_UNSTABLE: [persistAtom2],
});
