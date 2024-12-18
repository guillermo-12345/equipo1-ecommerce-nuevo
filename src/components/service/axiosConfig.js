import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://nombre-backend-vercel.vercel.app';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure URL starts with /api
    if (!config.url.startsWith('/api') && !config.url.startsWith('http')) {
      config.url = `/api${config.url}`;
    }
    
    // Log the request
    console.log('[API Request]:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      headers: config.headers
    });
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('[API Response]:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('[API Response Error]:', {
        status: error.response.status,
        url: error.config?.url,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('[API Network Error]:', {
        url: error.config?.url,
        message: error.message
      });
    } else {
      console.error('[API Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

// Add global defaults
axiosInstance.defaults.timeout = 10000; // 10 second timeout
axiosInstance.defaults.maxRedirects = 5;

export default axiosInstance;

