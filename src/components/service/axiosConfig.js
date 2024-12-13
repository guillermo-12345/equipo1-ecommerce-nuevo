import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://nombre-backend-vercel.vercel.app/api",
});

export default axiosInstance;
