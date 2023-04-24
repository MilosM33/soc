import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { OrderApi } from "../Api/Order/OrderApi";
import PreviousOrders from "../Components/PreviousOrders/PreviousOrders";
import Layout from "../Layout/Layout";
import { ICartItem } from "../Reducers/Cart/ICartItem";
import ShippingForm from "./Checkout/ShippingForm/ShippingForm";

export default function Orders() {
  const params = useParams();

  const [orderInfo, setOrder] = useState<any>(null);
  useEffect(() => {
    if (params.orderNumber) {
      OrderApi.getOrder(params.orderNumber)
        .then((res) => {
          setOrder(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          toast.error("Order not found");
        });
    }
  }, [params.orderNumber]);

  const cart = useSelector((state: any) => state.cart);
  return (
    <Layout>
      <div className="container mx-auto">
        {orderInfo && (
          <div>
            <h1 className="text-2xl my-3">
              Order # <span className="text-red-400">{params.orderNumber}</span>
            </h1>
            <p className="text-gray-400 my-3">
              Created on{" "}
              {new Date(orderInfo.order.created_at).toLocaleString("sk-sk")}
            </p>
            <h1 className="text-xl my-3 ">
              Order status: {orderInfo.order.status}{" "}
            </h1>
            <p className="text-gray-400">Thank you for your order.</p>
            <a
              href={`http://everydayessentials.tech:8000/api/invoice/${params.orderNumber}`}
              target="_blank"
              rel="noreferrer"
              className="text-red-400 underline "
            >
              Invoice
            </a>
            <h1 className="text-2xl my-5">Order Details</h1>
            <section className="my-8 flex flex-col gap-4 lg:w-1/2">
              {orderInfo.items.map((item: any, _: number) => (
                <div className="flex items-center gap-2">
                  {item.images.length != 0 && (
                    <img
                      src={item.images?.[0].path ?? ""}
                      alt=""
                      className="w-32 h-32"
                    ></img>
                  )}
                  <h1>{orderInfo.order.items[_].name}</h1>
                  <h1 className="text-gray-400">{item.name}</h1>
                  <h1>{item.quantity}</h1>
                  <h1 className="ml-auto">
                    {orderInfo.order.items[_].quantity} x {item.price} € Total{" "}
                    {item.price * orderInfo.order.items[_].quantity} €
                  </h1>
                </div>
              ))}
            </section>
            <section className="my-3">
              <h1 className="text-2xl my-5">Shipping Details</h1>
              <p>
                <span className="font-bold">Name: </span>{" "}
                {orderInfo.invoiceDetails.full_name}
              </p>
              <p>
                <span className="font-bold">Email: </span>{" "}
                {orderInfo.invoiceDetails.email}
              </p>
              <p>
                <span className="font-bold">Phone: </span>{" "}
                {orderInfo.invoiceDetails.phone}
              </p>

              <p>
                <span className="font-bold">Address: </span>{" "}
                {orderInfo.invoiceDetails.address}
              </p>
              <p>
                <span className="font-bold">City: </span>{" "}
                {orderInfo.invoiceDetails.city}
              </p>
              <p>
                <span className="font-bold">Zip: </span>{" "}
                {orderInfo.invoiceDetails.zip_code}
              </p>
              <p>
                <span className="font-bold">State: </span>{" "}
                {orderInfo.invoiceDetails.state}
              </p>
              <p>
                <span className="font-bold">Appartment: </span>{" "}
                {orderInfo.invoiceDetails.appartment}
              </p>
              <p>
                <span className="font-bold">Delivery: </span>{" "}
                {orderInfo.invoiceDetails.delivery_method}
              </p>
            </section>

            <hr />
          </div>
        )}
        <h1 className="text-2xl my-3">My Orders</h1>
        <PreviousOrders></PreviousOrders>
      </div>
    </Layout>
  );
}
