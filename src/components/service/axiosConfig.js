import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://nombre-backend-vercel.vercel.app/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

axiosInstance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
}, error => {
  console.log('Response Error:', error);
  return Promise.reject(error);
});

export default axiosInstance;

