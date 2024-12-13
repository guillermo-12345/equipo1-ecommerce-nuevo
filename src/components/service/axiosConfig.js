import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api-equipo1.vercel.app/api", 
});

export default axiosInstance;
