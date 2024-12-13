import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nombre-proyecto-backend.vercel.app/api",
});

export default axiosInstance;
