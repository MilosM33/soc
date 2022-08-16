import { get, post } from "./index";
export const Review = {
  getAll: (slug: string) => get(`/products/${slug}/reviews`),
  post: (slug: string, data: any) => post(`/products/${slug}/reviews`, data),
  //update: (slug: string, data: any) => put(`/products/${slug}/reviews/`, data),
  /*delete: (slug: string, id: number) =>
    delete `/products/${slug}/reviews/${id}`,*/
};
