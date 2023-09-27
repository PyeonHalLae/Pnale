import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: persistAtom1 } = recoilPersist({
  key: "recoil-persist-session",
  storage: sessionStorage, // 세션 스토리지 사용
});

const { persistAtom: persistAtom2 } = recoilPersist({
  key: "recoil-persist-local", //로컬 스토리지 사용
});

export const searchInputData = atom({
  key: "searchInputData",
  default: { input: "" },
  // effects_UNSTABLE: [persistAtom1],
});

export const localState = atom({
  key: "localState",
  default: { test2: "a" },
  effects_UNSTABLE: [persistAtom2],
});
