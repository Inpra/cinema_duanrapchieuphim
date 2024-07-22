import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44347", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
