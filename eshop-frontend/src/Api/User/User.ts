import { post, get } from "../Client";
import store from "../../store";
import { logout } from "../../Reducers/User/UserReducer";

export const User = {
  register: (data: any) => post("/auth/register", data),
  login: (data: any) => post("/auth/login", data),
  verify: (data: any) => post("/auth/verify", data),
  logout: () => {
    localStorage.removeItem("user");
    store.dispatch(logout());
    return post("/auth/logout");
  },
  refresh: () => post("/auth/refresh"),
  me: () => get("/auth/me"),
  searchUsers: (data: any) => get("/admin/users/search", { params: data }),
  deleteUser: (data: number) => post(`/admin/users/delete`, data),
  updateUser: (data: any) => post("/admin/users/update", data),
  createUser: (data: any) => post("/admin/users/create", data),

  changeUserLogin: (data: any) => post("/auth/change-login", data),
  setUserDetails: (data: any) => post("/auth/set-details", data),
  getUserDetails: () => get("/auth/get-details"),
};
