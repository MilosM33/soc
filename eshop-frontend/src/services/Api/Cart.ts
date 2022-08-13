import { post } from "./index";
export const Cart = {
  add: (data: any) => post("/cart/add", data),
  remove: (data: any) => post("/cart/remove", data),
};
