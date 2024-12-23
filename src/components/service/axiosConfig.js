import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://nombre-backend-vercel.vercel.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
