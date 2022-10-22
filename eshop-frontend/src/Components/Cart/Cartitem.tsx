import React from "react";
import ValueIncrement from "../Forms/ValueIncrement/ValueIncrement";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "../Forms/IconButton/IconButton";
export default function CartItem() {
  return (
    <article className="flex items-start">
      <img
        src="https://via.placeholder.com/150"
        className="w-24 object-contain"
        alt=""
      />

      <section className="flex-1 px-4">
        <div className="flex justify-between">
          <h1>Basic micro rib thurtleneck</h1>
          <IconButton onClick={() => 0}>
            <AiOutlineClose></AiOutlineClose>
          </IconButton>
        </div>
        <p>Variant</p>
        <p>Price</p>
        <section className="flex justify-between items-center">
          <ValueIncrement value={1}></ValueIncrement>

          <p>$79.00</p>
        </section>
      </section>
    </article>
  );
}
