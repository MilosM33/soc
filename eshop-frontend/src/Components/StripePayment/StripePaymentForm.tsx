import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Button from "../Forms/Button/Button";
import { useSelector } from "react-redux";
import { ICartItem } from "../../Reducers/Cart/ICartItem";
export default function StripePayment() {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state: any) => state.cart);

  const orderNumber = useSelector((state: any) => state.checkout.orderNumber);
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://everydayessentials.tech/order-complete/",

      },
    });
  };

  const subTotal = cart.items.reduce(
    (acc: number, item: ICartItem) =>
      acc + item.quantity * item.selectedVariant.price,
    0
  );

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="space-x-3 my-4">
        <Button variant="primary" type="submit">
          Pay
        </Button>

        <Button variant="secondary" type="button">
          Cancel
        </Button>
      </div>
      <h1 className="text-xl">Order number: {orderNumber}</h1>
      <h2 className="text-xl my-2">Shopping items</h2>
      {cart.items.map((item: ICartItem) => (
        <div className="flex items-center gap-2">
          <img
            src={item.selectedVariant.images[0]}
            alt=""
            className="w-32 h-32"
          ></img>
          <h1>{item.selectedVariant.name}</h1>
          <h1>{item.quantity}</h1>
          <h1 className="ml-auto">
            {item.quantity} x {item.selectedVariant.price} € Total{" "}
            {item.selectedVariant.price * item.quantity} €
          </h1>
        </div>
      ))}
      <h2 className="text-xl my-5">Sub total: {subTotal} €</h2>
      <h2>Discount: 0 €</h2>
      <h2>Shipping: 15 €</h2>

      <h2 className="text-xl my-5">Total: {subTotal + 15} €</h2>
    </form>
  );
}
