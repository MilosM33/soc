import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IShoppingItem } from "../ShoppingItem/ShoppingItem";
import ValueIncrement from "../ShoppingPreview/ValueIncrement/ValueIncrement";
import { useDispatch } from "react-redux";

import { setQuantity, removeItem } from "../../services/Cart/CartReducer";

export interface IItemVariant {
  name: string;
  price: number;
}
export interface ICartItem {
  item: IShoppingItem;
  quantity: number;
  variant?: IItemVariant;
}

export default function ShoppingCartItem(props: ICartItem) {
  const item: IShoppingItem = props.item;

  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeItem(item.name));
  }
  function handleChange(value: any) {
    dispatch(
      setQuantity({
        itemId: item.name,
        quantity: value,
        variant: props.variant,
      })
    );
  }
  return (
    <article className="flex gap-4">
      <img
        src={item.images && item.images.length > 0 ? item.images[0].image : ""}
        alt={item.name}
        className="w-20 h-20 object-cover"
      />

      <section className="flex-grow">
        <div className="flex justify-between">
          <h1>{item.name}</h1>
          <AiOutlineClose onClick={handleRemove} className="cursor-pointer" />
        </div>
        {props.variant && (
          <p className="text-gray-500">Variant: {props.variant.name}</p>
        )}
        <section className="flex justify-between">
          <ValueIncrement
            value={props.quantity}
            onChange={handleChange}
          ></ValueIncrement>
          {props.variant ? (
            <small>
              ${Math.floor(props.quantity * props.variant.price * 100) / 100}
            </small>
          ) : (
            <small>
              ${Math.floor(props.quantity * item.price * 100) / 100}
            </small>
          )}
        </section>
      </section>
    </article>
  );
}
