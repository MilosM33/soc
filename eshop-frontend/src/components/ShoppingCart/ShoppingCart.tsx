import React from "react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import EmptyShoppingCart from "./EmptyShoppingCart";
import ShoppingCartItem, { ICartItem } from "./ShoppingCartItem";
import ShoppingCartTotal from "./ShoppingCartTotal";

import { useSelector } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state: any) => state.cart);
  function toggleCart() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className="relative group cursor-pointer" onClick={toggleCart}>
        <AiOutlineShoppingCart className="text-2xl relative group-hover:animate-cartRotate" />
        {cart.items.length > 0 && (
          <div className="absolute -top-4 left-4 text-white bg-red-400 rounded-full w-6 h-6 text-xs group-hover:animate-pulse flex items-center justify-center scale-75">
            {cart.items.length}
          </div>
        )}
        <div
          className="absolute w-full
       h-1 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-400 group-hover:animate-roadMove"
        ></div>
      </div>
      {
        <div className="overflow-hidden">
          <Backdrop isOpen={isOpen} onClick={toggleCart}></Backdrop>
          <div
            className={`px-6 md:px-12 py-8 fixed top-0 ${
              isOpen ? "right-0" : "translate-x-full md:-right-1/2"
            } w-screen md:w-1/2 xl:w-1/4 h-full bg-white z-10 transition-all duration-500 ease-in-out`}
          >
            <div className="flex justify-between items-center">
              <h1>Cart</h1>
              <BiExit className="cursor-pointer" onClick={toggleCart}></BiExit>
            </div>
            <div className="flex flex-col my-16 gap-2 h-1/2 overflow-auto scrollbar-thin scrollbar-thumb-slate-800 pr-5">
              {cart.items.length === 0 && <EmptyShoppingCart />}
              {cart.items.map((item: ICartItem) => (
                <ShoppingCartItem
                  key={item.item.name}
                  {...item}
                ></ShoppingCartItem>
              ))}
            </div>
            {cart.items.length !== 0 && (
              <ShoppingCartTotal items={cart.items} />
            )}
          </div>
        </div>
      }
    </div>
  );
}
