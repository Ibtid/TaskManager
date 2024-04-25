import axios, { AxiosInstance } from "axios";

const axiosParams = {
  // Base URL should be set via environment
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:5000/api/v1/tasks" : "/",
};

const axiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get: (url:string, config = {}) => axios.get(url, config),
    delete: (url:string, config = {}) => axios.delete(url, config),
    post: (url:string, body:any, config = {}) => axios.post(url, body, config),
    patch: (url:string, body:any, config = {}) => axios.patch(url, body, config),
    put: (url:string, body:any, config = {}) => axios.put(url, body, config),
  };
};
export default api(axiosInstance);