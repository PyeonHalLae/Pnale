import { toast } from "react-toastify";

export const UserInfoExpires = () => toast.warning(`로그인이 만료되어 로그아웃 되었습니다`);

export const UserNotLogin = () => toast.warning(`로그인시 사용가능합니다`);
