import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://pnale.online",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
});

export const baseAxios = axios.create({
  baseURL: "https://pnale.online",
});
