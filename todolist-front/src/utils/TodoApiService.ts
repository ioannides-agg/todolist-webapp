import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://your.api.base.url',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
}, error => {
  return Promise.reject(error);
});

