import { get } from "./index";

export const Category = {
  getAll: () => get(`/categories`),
};
