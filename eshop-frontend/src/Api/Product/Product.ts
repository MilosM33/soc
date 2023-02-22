import { get, post } from "../Client";
export const Product = {
  getProductsByPage: (page: number, data?: any) =>
    get("/products?page=" + page, data),
  getProduct: (id: string) => get(`/products/${id}`),
  searchProducts: (query: string) => get(`/products/search/${query}`),

  searchVariants: (query: string, name: string) =>
    get(`/products/${name}/searchvariants/${query}`),

  getRelatedProducts: (slug: string) => get(`/products/related/${slug}`),

  getItemsFromOrder: (id: string) => get(`/admin/orders/getitems/${id}`),
  removeItemFromOrder: (data: any) => post(`/admin/orders/removeitem/`, data),

  updateOrder: (data: any) => post(`/admin/orders/update`, data),
};
