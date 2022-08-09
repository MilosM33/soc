import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../../services/Cart/CartReducer";

export interface IShoppingItem {
  id: number;
  name: string;
  price: number;
  img_path: string;
  description: string;
  quantity?: number;
}

export function ShoppingItem(props: IShoppingItem) {
  const dispatch = useDispatch();
  function addToCart() {
    dispatch(
      addItem({
        ...props,
      })
    );
    const notify = () => toast.success("Product added to shopping cart!");
    notify();
  }
  return (
    <div className="w-full group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={require("./placeholder.png")}
          className="w-full object-cover aspect-square"
          alt=""
        />
        <div className="absolute w-fit h-fit bottom-0 left-1/2 -translate-x-1/2 text-slate-800 bg-white rounded-lg shadow-lg flex justify-center items-center translate-y-full duration-200 group-hover:-translate-y-full overflow-hidden">
          <div className="px-2 py-1 hover:bg-gray-300">
            <AiOutlineHeart />
          </div>
          <div className="px-2 py-1 hover:bg-gray-300">
            <AiOutlineShoppingCart onClick={addToCart} />
          </div>
        </div>
      </div>
      <h1 className="text-xl font-medium text-slate-800">{props.name}</h1>
      <h3 className="text-gray-400">${props.price}</h3>
    </div>
  );
}
