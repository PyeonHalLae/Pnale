import { atom } from "recoil";

export interface MemberType {
  email: string;
  memberId: number;
  memberImg: string;
  nickname: string;
  socialType: string;
}

export const MemberInfo = atom<{ member: MemberType }>({
  key: "MemberInfo",
  default: {
    member: {
      email: "",
      memberId: null,
      memberImg: "",
      nickname: "",
      socialType: "",
    },
  },
});
