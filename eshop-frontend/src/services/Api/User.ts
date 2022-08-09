import { post } from "./index";

export const User = {
  login: (data: any) => post("/auth/login", data),
  register: (data: any) => post("/auth/register", data),
  logout: () => post("/auth/logout"),
};
