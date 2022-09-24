import { get } from "./index";
export const Product = {
  get: (slug: string) => get(`/products/${slug}`),
  getAll: () => get(`/products`),
  getByPage: (page: number) => get(`/products?page=${page}`),
  getAttributes: (slug: string) => get(`/products/${slug}/attributes`),
  getVariants: (slug: string) => get(`/products/${slug}/variants`),
  getVariantInfo: (slug: string, variant: string) =>
    get(`/products/${slug}/variants/${variant}`),
};
