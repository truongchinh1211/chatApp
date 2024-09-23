import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const API = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
    config => {
        config.token = config.token || false
      if (config.token === true) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  API.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      return Promise.reject(error);
    }
  )
