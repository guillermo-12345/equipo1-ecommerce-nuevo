import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

export default axiosInstance;
