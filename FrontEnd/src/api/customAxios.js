import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://i9.b303.asd/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
});

export const baseAxios = axios.create({
  baseURL: "https://i9.b303.asd/api",
});
