import axios from "axios";
const axiosPublic = axios.create({ baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api" });
export default axiosPublic;