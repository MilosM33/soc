import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IShoppingItem } from "../ShoppingItem/ShoppingItem";
import ValueIncrement from "../ShoppingPreview/ValueIncrement/ValueIncrement";
import { useDispatch } from "react-redux";

import { setQuantity, removeItem } from "../../services/Cart/CartReducer";
export interface ICartItem {
  item: IShoppingItem;
  quantity: number;
}

export default function ShoppingCartItem(props: ICartItem) {
  const item: IShoppingItem = props.item;

  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeItem(item.name));
  }
  function handleChange(value: any) {
    dispatch(setQuantity({ itemId: item.name, quantity: value }));
  }
  return (
    <article className="flex gap-4">
      <img src={item.images[0].image} className="w-16" alt="" />
      <section className="flex-grow">
        <div className="flex justify-between">
          <h1>{item.name}</h1>
          <AiOutlineClose onClick={handleRemove} className="cursor-pointer" />
        </div>
        <section className="flex justify-between">
          <ValueIncrement
            value={props.quantity}
            onChange={handleChange}
          ></ValueIncrement>
          <small>${Math.floor(props.quantity * item.price * 100) / 100}</small>
        </section>
      </section>
    </article>
  );
}
