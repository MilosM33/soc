import React from "react";
import { useSelector } from "react-redux";
import Select from "../../../Components/Forms/Select/Select";
import Button from "../../../Components/Forms/Button/Button";
import { useOutletContext } from "react-router";
import { useDispatch } from "react-redux";
import { setPaymentType } from "../../../Reducers/Cart/CheckoutReducer";

export default function Payment() {
  const checkout = useSelector((state: any) => state.checkout);
  const dispatch = useDispatch();
  const [prevStep, nextStep] =
    useOutletContext<[prev: Function, next: Function]>();

  return (
    <section>
      <h1 className="text-center text-3xl my-2">Choose payment</h1>
      <section className="flex my-9 flex-col gap-4 lg:w-1/2 md:mx-auto">
        <Select
          options={["Pay on delivery", "Stripe"]}
          selected={checkout.paymentType}
          onChange={(e) => dispatch(setPaymentType(e.target.value))}
          placeholder="Select payment type"
        ></Select>
      </section>

      <section className="mt-auto text-center space-x-4">
        <Button variant="secondary" onClick={() => prevStep()}>
          Prev step
        </Button>
        <Button variant="primary" onClick={() => nextStep()}>
          Next step
        </Button>
      </section>
    </section>
  );
}
