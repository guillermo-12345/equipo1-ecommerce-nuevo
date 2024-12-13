

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://equipo1-ecommerce-nuevo.vercel.app/api",
});

export default axiosInstance;
