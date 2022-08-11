import axios from "axios";
import { UserAuth } from "../User/UserAuth";
import { User } from "./User";

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
  headers: { Authorization: `Bearer ${getAuth()?.access_token}` },
});

const FIVE_MINUTES = 5 * 60 * 1000;

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
