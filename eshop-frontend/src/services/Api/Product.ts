import { get } from "./index";
export const Product = {
  get: (slug: string) => get(`/products/${slug}`),
  getAll: () => get(`/products`),
};
