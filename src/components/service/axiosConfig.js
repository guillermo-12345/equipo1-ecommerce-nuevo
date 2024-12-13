import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nombre-backend-vercel.vercel.app/api", 
});

export default axiosInstance;
