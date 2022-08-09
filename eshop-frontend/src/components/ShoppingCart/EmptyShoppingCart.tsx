import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../Button/Button";
export default function EmptyShoppingCart() {
  return (
    <div className="text-center space-y-5">
      <AiOutlineShoppingCart className="text-4xl text-slate-500 mx-auto"></AiOutlineShoppingCart>
      <div>No products in the cart.</div>

      <Button>Continue Shopping</Button>
    </div>
  );
}
