// recoil/atoms.ts
import { atom } from "recoil";

//자신이 사용할 상태들 생길때 마다 만들 기본 틀
export const testState = atom({
  //const 리코일이름
  key: "testState",
  default: { test1: 0, test2: "" }, // 상태의 타입을 지정
});
