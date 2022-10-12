import axios from "axios";
function getAuth() {
  const auth = localStorage.getItem("Auth");
  if (auth) {
    return JSON.parse(auth);
  } else {
    return null;
  }
}

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

apiClient.interceptors.request.use(function (config) {
  const auth = getAuth();
  if (auth && config.headers) {
    config.headers.Authorization = `Bearer ${auth.access_token}`;
  }
  return config;
});

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
