// src/services/apiService.js
import axios from "axios";

const apiService = axios.create({
  baseURL: "https://api.spacexdata.com/v3", // Update this with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendRequest = async (method, endpoint, data = {}, config = {}) => {
  try {
    const response = await apiService({
      method,
      url: endpoint,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
