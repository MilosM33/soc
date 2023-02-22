import React from "react";
import ValueIncrement from "../Forms/ValueIncrement/ValueIncrement";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "../Forms/IconButton/IconButton";
import { ICartItem, ICartItemVariant } from "../../Reducers/Cart/ICartItem";
import { useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  changeVariant,
} from "../../Reducers/Cart/CartReducer";

export default function CartItem(props: ICartItem) {
  const dispatch = useDispatch();
  function onQuantityChange(value: number) {
    const item: ICartItem = {
      ...props,
      quantity: value,
    };
    dispatch(updateQuantity(item));
  }

  function removeItem() {
    const item: ICartItem = {
      ...props,
    };
    dispatch(removeFromCart(item));
  }
  function updateVariant(e: any) {
    const variantId = parseInt(e.target.value);
    const variant = props.variants?.find((v) => v.id === variantId);
    if (variant) {
      const item = {
        item: { ...props },
        selectedVariant: variant,
      };
      dispatch(changeVariant(item));
    }
  }
  return (
    <article
      className="flex items-start"
      key={props.title + props.selectedVariant.name}
    >
      <img
        src={props.selectedVariant.images[0]}
        className="w-24 aspect-square object-cover"
        alt=""
      />

      <section className="flex-1 px-4">
        <div className="flex justify-between">
          <h1>{props.title}</h1>
          <IconButton onClick={removeItem} defaultSize={false}>
            <AiOutlineClose></AiOutlineClose>
          </IconButton>
        </div>

        {props.variants && props.variants.length > 0 && (
          <select
            name=""
            id=""
            value={props.selectedVariant?.id}
            onChange={updateVariant}
          >
            {props.variants?.map((variant: ICartItemVariant) => {
              return <option value={variant.id}>{variant.name}</option>;
            })}
          </select>
        )}
        <p>{props.selectedVariant.price} €</p>
        <section className="flex justify-between items-center">
          <ValueIncrement
            value={props.quantity}
            onChange={onQuantityChange}
            min={1}
          ></ValueIncrement>

          <p>{props.selectedVariant.price * props.quantity} €</p>
        </section>
      </section>
    </article>
  );
}
