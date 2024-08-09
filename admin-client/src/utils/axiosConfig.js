import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend-ecommecre.onrender.com/api',
    withCredentials: true // Để gửi cookie kèm theo request
});

// Thêm interceptor để đính kèm token vào header của mọi yêu cầu
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default axiosInstance;
