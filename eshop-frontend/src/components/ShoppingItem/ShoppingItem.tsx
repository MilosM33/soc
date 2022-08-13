import React from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addItem } from "../../services/Cart/CartReducer";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../services/Wishlist/WishlistReducer";

export interface IShoppingItem {
  name: string;
  price: number;
  img_path: string;
  description: string;
  quantity?: number;
  wishlist?: boolean;
}

export function ShoppingItem(props: IShoppingItem) {
  const dispatch = useDispatch();
  function wishlistItem() {
    const notify = () => toast.success("Product added to wishlist");
    notify();
    dispatch(addToWishlist(props.name));
  }

  function removeWishlistItem() {
    const notify = () => toast.success("Product removed from wishlist");
    notify();
    dispatch(removeFromWishlist(props.name));
  }

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
        <Link to="product/ea-voluptatum-quaerat-qui-fuga">
          <img
            src={require("./placeholder.png")}
            className="w-full object-cover aspect-square"
            alt=""
          />
        </Link>
        <div className="absolute w-fit h-fit bottom-0 left-1/2 -translate-x-1/2 text-slate-800 bg-white rounded-lg shadow-lg flex justify-center items-center translate-y-full duration-200 group-hover:-translate-y-full overflow-hidden">
          <div className="px-2 py-1 hover:bg-gray-300">
            {props.wishlist ? (
              <AiFillHeart onClick={removeWishlistItem}></AiFillHeart>
            ) : (
              <AiOutlineHeart onClick={wishlistItem} />
            )}
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
