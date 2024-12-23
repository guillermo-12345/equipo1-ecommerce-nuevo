import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || 'https://nombre-backend-vercel.vercel.app';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
