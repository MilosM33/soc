import { get } from "./index";
export const Product = {
  get: (slug: string) => get(`/products/${slug}`),
  getAll: () => get(`/products`),
  getAttributes: (slug: string) => get(`/products/${slug}/attributes`),
  getVariants: (slug: string) => get(`/products/${slug}/variants`),
};
