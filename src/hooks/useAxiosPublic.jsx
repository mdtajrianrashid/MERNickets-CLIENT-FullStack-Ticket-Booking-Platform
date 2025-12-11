// src/hooks/useAxiosPublic.jsx
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosPublic = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

export default function useAxiosPublic() {
  return axiosPublic;
}