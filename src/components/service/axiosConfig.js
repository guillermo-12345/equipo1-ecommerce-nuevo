import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://nombre-proyecto-backend.vercel.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
