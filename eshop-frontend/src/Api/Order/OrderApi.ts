import { get, post } from "../Client";
export const OrderApi = {
  getOrders: () => get("/orders/get"),
  getOrder: (orderId: string) => get(`/orders/${orderId}`),
  trackOrder: (orderId: string) => get(`/track-order/${orderId}`),
  searchOrders: (data: any) => get("/admin/orders/search", { params: data }),
  deleteOrder: (data: number) => post(`/admin/orders/delete`, data),
  updateOrder: (data: any) => post("/admin/orders/update", data),
  createOrder: (data: any) => post("/admin/orders/create", data),
};
