import React from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import BlackOverlay from "../BlackOverlay/BlackOverlay";
import Button from "../Forms/Button/Button";
import CartItem from "./CartItem";
import IconButton from "../Forms/IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../Reducers/Cart/CartReducer";
import { ICartState } from "../../Reducers/Cart/CartReducer";
import { ICartItem } from "../../Reducers/Cart/ICartItem";
import {  useNavigate } from "react-router-dom";

export default function Cart() {
  const cart: ICartState = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function openCart() {
    dispatch(toggleCart());
  }
  function goToCheckout() {
    navigate("/checkout/cart");

    setTimeout(() => {
      dispatch(toggleCart());
    }, 250);
  }
  return (
    <section className="relative">
      <IconButton onClick={openCart}>
        <AiOutlineShoppingCart></AiOutlineShoppingCart>
      </IconButton>
      {cart.items.length > 0 && (
        <div className="absolute w-6 h-6 flex justify-center items-center scale-50 rounded-full -top-1/2 left-1/2  bg-red-400 text-white">
          {cart.items.length}
        </div>
      )}
      <section>
        <BlackOverlay
          isOpen={cart.isOpen}
          onClick={openCart}
          clickOutside
        ></BlackOverlay>
        <div
          className={
            "fixed z-50 top-0 right-0 w-full h-screen md:w-1/2 xl:w-1/4 bg-white transition-all duration-200 " +
            (cart.isOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          <section className="p-8 flex flex-col h-full">
            <div className="flex mb-8 justify-between items-center">
              <h1 className="text-2xl ">Cart</h1>
              <IconButton onClick={openCart}>
                <AiOutlineClose></AiOutlineClose>
              </IconButton>
            </div>
            <section className="flex flex-col flex-1 space-y-4  overflow-auto">
              {cart.items.map((item: ICartItem) => {
                return <CartItem {...item}></CartItem>;
              })}
            </section>
            <footer className="mt-auto h-fit pt-4">
              <hr />
              <h1 className="text-xl pt-4">
                Total:{" "}
                <span className="text-primary">
                  {cart.items.reduce((total: number, item: ICartItem) => {
                    return total + item.selectedVariant.price * item.quantity;
                  }, 0)}{" "}
                  €
                </span>
              </h1>
              <h2 className="text-lg text-gray-400 font-light">
                Shipping: <span>$ 0.00</span>
              </h2>

              <Button className="w-full" onClick={goToCheckout}>
                Checkout
              </Button>
              <Button className="w-full" variant="secondary" onClick={openCart}>
                Continue shopping
              </Button>
            </footer>
          </section>
        </div>
      </section>
    </section>
  );
}
