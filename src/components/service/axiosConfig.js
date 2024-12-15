import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://nombre-backend-vercel.vercel.app/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  },
  error => {
    console.log('Response Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

