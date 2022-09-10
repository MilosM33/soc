import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../Utils/Button/Button";
export default function EmptyShoppingCart(props: any) {
  return (
    <div className="text-center space-y-5">
      <AiOutlineShoppingCart className="text-4xl text-slate-500 mx-auto"></AiOutlineShoppingCart>
      <div>No products in the cart.</div>

      <Button onClick={() => props.toggle()}>Continue Shopping</Button>
    </div>
  );
}
