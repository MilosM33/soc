import React from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState } from "react";
export default function Product() {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <article className="w-full max-w-sm md:max-w-none mx-auto cursor-pointer">
      <section className="relative w-full">
        <img
          src="https://via.placeholder.com/150"
          alt=""
          className="w-full aspect-square object-cover rounded-lg"
        />
        <div className="absolute w-full px-4 flex justify-between bottom-4 left-0">
          <div className="bg-white p-2 rounded-full">
            {isFavorite ? (
              <AiFillHeart className="text-2xl text-red-400" />
            ) : (
              <AiOutlineHeart className="text-2xl text-primary"></AiOutlineHeart>
            )}
          </div>
          <div className="bg-white p-2 rounded-full">
            <AiOutlineShoppingCart className="text-2xl relative hover:rotate" />
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-col">
          <span className="bg-red-400 text-white rounded-full px-4">Sale</span>
        </div>
      </section>
      <section className="flex gap-2 my-2">
        <AiFillStar className="text-red-400"></AiFillStar>
        <AiFillStar className="text-red-400"></AiFillStar>
        <AiFillStar className="text-red-400"></AiFillStar>
        <AiFillStar className="text-red-100"></AiFillStar>
        <AiFillStar className="text-red-100"></AiFillStar>
      </section>
      <section className="flex justify-between items-center">
        <h3 className="text-primary text-xl">Product 1</h3>
        <h4 className="text-primary font-medium text-xl">56 000 €</h4>
      </section>
    </article>
  );
}
