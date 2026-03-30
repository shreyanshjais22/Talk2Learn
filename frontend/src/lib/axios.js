import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? "/api"  // In production, use Vercel rewrites (same-origin, no third-party cookie issues)
  : "https://talk2learn-2.onrender.com/api";  // In dev, hit Render directly

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
