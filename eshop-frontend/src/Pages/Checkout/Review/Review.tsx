import React from "react";
import { useSelector } from "react-redux";
import Select from "../../../Components/Forms/Select/Select";
import { ICartItem } from "../../../Reducers/Cart/ICartItem";
import ShippingForm from "../ShippingForm/ShippingForm";
import Button from "../../../Components/Forms/Button/Button";
import { useNavigate, useOutletContext } from "react-router";
import { PaymentApi } from "../../../Api/PaymentApi/PaymentApi";
import { useDispatch } from "react-redux";
import {
  setClientSecret,
  setOrderNumber,
} from "../../../Reducers/Cart/CheckoutReducer";

export default function Review() {
  const cart = useSelector((state: any) => state.cart);
  const checkout = useSelector((state: any) => state.checkout);
  const [prevStep, nextStep] =
    useOutletContext<[prev: Function, next: Function]>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function createOrder() {
    PaymentApi.createOrder({
      shippingForm: checkout.shippingForm,
      items: cart.items.map((item: ICartItem) => ({
        variant_name: item.selectedVariant.name,
        quantity: item.quantity,
      })),
    }).then((res) => {
      navigate("/order-complete");
    });
  }

  function procedToPayment() {
    PaymentApi.createOrder({
      shippingForm: checkout.shippingForm,
      items: cart.items.map((item: ICartItem) => ({
        variant_name: item.selectedVariant.name,
        quantity: item.quantity,
      })),
    }).then((res) => {
      dispatch(setOrderNumber(res.data.id));

      PaymentApi.getPaymentSecret({
        order_id: res.data.id,
      }).then((response) => {
        dispatch(setClientSecret(response.data.client_secret));
        nextStep();
      });
    });
  }

  return (
    <section>
      <h1 className="text-center text-3xl my-2">Order review</h1>
      <section className="my-4 flex flex-col gap-4 lg:w-1/2 md:mx-auto">
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
        <h2 className="text-xl my-2">Payment type</h2>
        <Select
          disabled={true}
          options={["PayPal", "Credit card", "Bank transfer", "Stripe"]}
          selected={checkout.paymentType}
        ></Select>
      </section>
      <ShippingForm readOnly={true}></ShippingForm>
      <section className="mt-auto text-center space-x-4">
        <Button variant="secondary" onClick={() => prevStep()}>
          Prev step
        </Button>

        {checkout.paymentType !== "Pay on delivery" ? (
          <Button variant="primary" onClick={() => procedToPayment()}>
            Proced to payment
          </Button>
        ) : (
          <Button variant="primary" onClick={() => createOrder()}>
            Create order
          </Button>
        )}
      </section>
    </section>
  );
}
