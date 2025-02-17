import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: { version: 1, "Content-Type": "application/json" },
});

const fetcher= async<T=any>  (
  url: string,
  method: "get" | "post" | "put" | "delete" = "get",
  data?: any
) => {
  const res = await api.request<T>({ url, method, data });
  return res.data;
};

export default fetcher;
