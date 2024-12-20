const axiosInstance = axios.create({
  baseURL: 'https://nombre-backend-vercel.vercel.app/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos de timeout
});

// Interceptor para registrar errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
