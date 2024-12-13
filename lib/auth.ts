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

const createPublicApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  const apiPublic = axios.create({
    baseURL: baseURL,
  });
  return apiPublic;
};

// export const apiCaller = createApi({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL! });
export const apiCaller = createApi({ baseURL: "https://hrm.kaliper.in" });
// export const publicApiCaller = createPublicApi({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL! });
export const publicApiCaller = createPublicApi({ baseURL: "https://hrm.kaliper.in" });
