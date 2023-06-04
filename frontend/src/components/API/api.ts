import axios from "axios";

const api = axios.create({
  baseURL: `http://${import.meta.env.VITE_DOMAIN}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
