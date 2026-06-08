import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/**
 * @desc Request Interceptor
 */
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * @desc Response Interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;