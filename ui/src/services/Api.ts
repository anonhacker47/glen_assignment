import axios from "axios";

export default () => {
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return axiosInstance;
};
