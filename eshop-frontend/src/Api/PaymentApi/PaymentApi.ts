import { get, post } from "../Client";

export const PaymentApi = {
  createOrder: (data: any) => post("/order/create", data),
  getPaymentSecret: (data: any) => post("/payment/secret", data),
};
