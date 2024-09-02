import axios, { AxiosInstance } from "axios";

interface ApiConfig {
  baseURL: string;
}

// just for now
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwNTcxMzA5LCJpYXQiOjE3MjQ4MDMzMDksImp0aSI6IjhiYjE2N2QyZGNjYjRjNWFhN2VlNTQxYmY3MjQwNmU2IiwidXNlcl9pZCI6IjUzZGIzMTc5LTJjMGUtNDBiMS04ODU2LWRiODcyZTAzYjJkMSJ9.LgxJk6lADe-4WcG59TR-zY0__ytisATkRsike_7ccFg";
export const createApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  // TODO: make this interceptors work
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    },
  );

  return api;
};
// http://localhost:8000
export const api = createApi({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL! });
