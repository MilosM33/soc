import React from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router";
import { ICartItem } from "../../../Reducers/Cart/ICartItem";
import CartItem from "../../../Components/Cart/CartItem";

import Button from "../../../Components/Forms/Button/Button";
import TextInput from "../../../Components/Forms/TextInput/TextInput";
import { toast } from 'react-toastify';

export default function CheckoutCart() {
  const cart = useSelector((state: any) => state.cart);

  const [prevStep, nextStep] =
    useOutletContext<[prev: Function, next: Function]>();

  function handleNextStep() {
    if (cart.items.length !== 0) {
      nextStep();
    }
    else{
      toast.error("Your cart is empty", {
        autoClose: 2000,
      });
    }
  }

  function applyCupoun() {
    alert("Not implemented yet");
  }
  return (
    <>
      
      <h1 className="text-center text-3xl my-2">Shopping cart</h1>
      <section className="flex flex-col md:flex-row">
        <section className="flex flex-col gap-2 lg:w-1/2 lg:mx-auto overflow-auto max-h-96">
          {cart.items.map((item: ICartItem) => (
            <CartItem {...item}></CartItem>
          ))}

          {cart.items.length === 0 && (
            <p className="text-center mb-[150px]">Your cart is empty</p>
          )}
        </section>
        
      </section>
      <section className="mt-auto text-center space-x-4">
        <Button variant="primary" onClick={() => handleNextStep()}>
          Next step
        </Button>
      </section>
    </>
  );
}
