import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://nombre-backend-vercel.vercel.app/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
