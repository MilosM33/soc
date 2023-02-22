import axios from "axios";

const Client = axios.create({
  baseURL: `http://everydayessentials.tech:8000/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Client.interceptors.request.use(
  (config) => {
    const json = localStorage.getItem("user");
    if (json) {
      const user = JSON.parse(json);
      if (user && config.headers !== undefined) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
/* 
Client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let token;
      await Client.post("/auth/refresh").catch((err) => {
        const headers = err.response.headers;
        token = headers.authorization;
        console.log(err.response.headers);
        console.log("token", token);
      });
      if (token) {
        Client.defaults.headers.common["Authorization"] = token;
        return Client(originalRequest);
      }
    }
    return Promise.reject(error);
  }
); */

export default Client;

export const { get, post, put, delete: destroy } = Client;
