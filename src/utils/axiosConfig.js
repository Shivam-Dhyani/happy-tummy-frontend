import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor to set the Authorization header before each request
axiosInstance?.interceptors?.request?.use(async (config) => {
  try {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.error("Failed to retrieve access token:", error);
  }
  return config;
});

const axiosService = {
  get: async (url, params) => {
    try {
      const response = await axiosInstance.get(url, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await axiosInstance.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default axiosService;
