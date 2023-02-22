import { get, post } from "../Client";
export const Category = {
  getCategories: () => get("/categories"),
  getSubCategoriesByCategory: (id: string) => get(`/categories/${id}`),
  getNavibarCategories: () => get("/navbar-categories"),
  searchCategories: (data: any) => get(`/admin/categories/search/`,{ params: data }),
  deleteCategory: (data: number) => post(`/admin/categories/delete`, data),
  updateCategory: (data: any) => post("/admin/categories/update", data),
  createCategory: (data: any) => post("/admin/categories/create", data),
};
