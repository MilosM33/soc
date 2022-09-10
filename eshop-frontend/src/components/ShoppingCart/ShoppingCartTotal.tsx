import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Utils/Button/Button";
import { ICartItem } from "./ShoppingCartItem";
export default function ShoppingCartTotal(props: any) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <h2>
        Total: $
        {Math.floor(
          props.items.reduce(
            (acc: number, item: ICartItem) =>
              acc + item.item.price * item.quantity,
            0
          ) * 100
        ) / 100}
        <h2>Free shipping!</h2>
      </h2>
      <Button type="secondary">Go to cart</Button>
      <Button type="primary" onClick={() => navigate("./checkout")}>
        Checkout
      </Button>
    </div>
  );
}
