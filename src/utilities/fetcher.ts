import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetcher = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: { version: 1, "Content-Type": "application/json" },
});


export default fetcher;
