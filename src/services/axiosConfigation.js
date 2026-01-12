import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
      // "Content-Type": "multipart/form-data",
       'Accept': 'application/json',
  },
});

// REQUESTS INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const errorHandler = (error) => {
  if (
    error &&
    error.response &&
    error.response.status === 401 &&
    error.response.statusText === "Unauthorized"
  ) {
    window.location.href = "/";
    return;
  }
  return Promise.reject(error);
};

// RESPONSES INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error)
);

export default api;
