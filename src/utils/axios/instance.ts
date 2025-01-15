import axios from "axios";

const api = axios.create({
  baseURL: "https://apisyamresto.syamdev.my.id/api",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
