import { post, get } from "./index";

export const User = {
  login: (data: any) => post("/auth/login", data),
  register: (data: any) => post("/auth/register", data),
  logout: () => post("/auth/logout"),
  refresh: () => post("/auth/refresh"),
  me: () => get("/auth/me"),
};
