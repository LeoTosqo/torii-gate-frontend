import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://torri-gate-leoo.onrender.com/api",
});
