import axios, { AxiosRequestConfig } from "axios";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const axiosInterceptors = async () => {
  axios.interceptors.request.use((request: AxiosRequestConfig) => {
    if (request.headers) request.headers["x-auth-token"] = `${ACCESS_TOKEN}`;

    return request;
  });
};
