import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-equipo1.vercel.app/api", 
});

export default axiosInstance;
