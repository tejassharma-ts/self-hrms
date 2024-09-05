import axios, { AxiosInstance } from "axios";

interface ApiConfig {
  baseURL: string;
}

// just for now
export const createApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    // headers: {
    //   Authorization: `Bearer ${TOKEN}`,
    // },
  });

  // TODO: make this interceptors work
  // api.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     return error;
  //   },
  // );

  return api;
};

const createPublicApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  const apiPublic = axios.create({
    withCredentials: true,
    baseURL: baseURL,
  });

  // TODO: make this interceptors work
  // apiPublic.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     return error;
  //   },
  // );

  return apiPublic;
};

// http://localhost:8000
export const api = createApi({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL! });
export const apiPublic = createPublicApi({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL! });
