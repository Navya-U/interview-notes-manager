import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const attachGlobalErrorHandler = (showError) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        showError('Network Error: Please check your connection.');
      } else {
        showError(error.response.data?.msg || 'An error occured.');
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
