import axios from "axios";

const getApiBaseUrl = () => {
  return "https://cvb-server-production.up.railway.app/api";
};

const API_BASE_URL = getApiBaseUrl();

export const api = axios.create({ baseURL: API_BASE_URL });

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(
      "API Request:",
      config.method?.toUpperCase(),
      config.baseURL + config.url
    );
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Response Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);
