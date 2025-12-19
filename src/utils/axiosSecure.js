import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://mernickets-server.vercel.app/api",
});

export default axiosSecure;