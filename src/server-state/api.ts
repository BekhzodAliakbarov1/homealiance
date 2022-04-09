import axios, { AxiosError } from "axios";
import { getStorage } from "../utils/local-storage";

// const request = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
// });

const request = {
  private: axios.create({ baseURL: process.env.REACT_APP_BASE_URL }),
  public: axios.create({ baseURL: process.env.REACT_APP_BASE_URL }),
};

request.private.interceptors.request.use(
  (config) => {
    const accessToken = getStorage("accessToken");
    if (accessToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    console.log(config);

    return config;
  },
  (error) => Promise.reject(error)
);

request.private.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

request.public.interceptors.request.use(
  (config) => config,

  (error) => Promise.reject(error)
);

request.public.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

export { request };
