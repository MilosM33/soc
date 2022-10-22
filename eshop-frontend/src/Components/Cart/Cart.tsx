import React from "react";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState } from "react";
import BlackOverlay from "../BlackOverlay/BlackOverlay";
import Button from "../Forms/Button/Button";
import CartItem from "./Cartitem";
import IconButton from "../Forms/IconButton/IconButton";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <AiOutlineShoppingCart
        className="text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      ></AiOutlineShoppingCart>

      <section>
        <BlackOverlay isOpen={isOpen}></BlackOverlay>
        <div
          className={
            "fixed z-20 top-0 right-0 w-full h-screen md:w-1/2 lg:w-1/4 bg-white transition-all duration-200 " +
            (isOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          <section className="p-8 flex flex-col h-full">
            <div className="flex mb-8 justify-between items-center">
              <h1 className="text-2xl ">Cart</h1>
              <IconButton onClick={() => setIsOpen(!isOpen)}>
                <AiOutlineClose></AiOutlineClose>
              </IconButton>
            </div>
            <section className="flex flex-col flex-1 space-y-4  overflow-auto">
              <CartItem></CartItem>
            </section>
            <footer className="mt-auto h-fit pt-4">
              <hr />
              <h1 className="text-xl pt-4">
                Total: <span className="text-primary">$ 0.00</span>
              </h1>
              <h2 className="text-lg text-gray-400 font-light">
                Shipping: <span>$ 0.00</span>
              </h2>

              <Button className="w-full">Checkout</Button>
              <Button className="w-full" variant="secondary">
                Continue shopping
              </Button>
            </footer>
          </section>
        </div>
      </section>
    </section>
  );
}
