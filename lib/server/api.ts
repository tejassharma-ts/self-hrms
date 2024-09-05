import { cookies } from "next/headers";
import axios, { AxiosInstance } from "axios";

interface ApiConfig {
  baseURL: string;
}

export const createApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });

  return api;
};

export function getAuthCookies() {
  return {
    Cookie: cookies()
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; "),
  };
}

export const apiServer = createApi({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL! });
