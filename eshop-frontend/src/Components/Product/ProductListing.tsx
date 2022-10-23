import React, { useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState } from "react";
import IconButton from "../Forms/IconButton/IconButton";
import ReviewStars from "../ReviewStars/ReviewStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Reducers/Cart/CartReducer";
import IProductListing from "./IProductListing";
import { ICartItem } from "../../Reducers/Cart/ICartItem";

import { Link } from "react-router-dom";
export default function ProductListing(props: IProductListing) {
  const [isFavorite, setIsFavorite] = useState(false);

  const [product, setProduct] = useState<IProductListing>({ ...props });
  const PRODUCT_URL = "./products/" + props.slug;

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
  }

  const dispatch = useDispatch();
  function addProductToCart() {
    const item: ICartItem = {
      ...product,
      selectedVariant: product.selectedVariant,
      quantity: 1,
    };
    dispatch(addToCart(item));
  }

  function onChangeVariant(e: any) {
    const variantId = parseInt(e.target.value);
    const variant = product.variants?.find((v) => v.id === variantId);
    if (variant) {
      setProduct({
        ...product,
        selectedVariant: variant,
      });
    }
  }

  return (
    <article
      className="w-full max-w-sm md:max-w-none mx-auto cursor-pointer"
      key={props.key}
    >
      <section className="relative w-full">
        <Link to={PRODUCT_URL}>
          <img
            src={product.selectedVariant.image}
            alt=""
            className="w-full aspect-square object-cover rounded-lg"
          />
        </Link>
        <div className="absolute w-full px-4 flex justify-between bottom-4 left-0">
          <div className="bg-white p-2 rounded-full">
            {isFavorite ? (
              <AiFillHeart className="text-2xl text-red-400 hover:text-primary" />
            ) : (
              <AiOutlineHeart className="text-2xl text-primary hover:text-red-400"></AiOutlineHeart>
            )}
          </div>
          <div className="bg-white p-2 rounded-full hover:text-red-400">
            <IconButton onClick={addProductToCart}>
              <AiOutlineShoppingCart />
            </IconButton>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          {props.tags?.map((tag, index) => (
            <span className="bg-red-400 text-white rounded-full px-4">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <ReviewStars
        rating={product.selectedVariant?.rating}
        key={product.selectedVariant?.rating}
      ></ReviewStars>

      <section className="flex justify-between items-center">
        <Link to={PRODUCT_URL}>
          <h3 className="text-primary text-xl">{product.title}</h3>
        </Link>
        <h4 className="text-primary font-medium text-xl">
          {product.selectedVariant.price} €
        </h4>
      </section>
      <section className="my-2">
        {product.variants && product.variants.length > 1 && (
          <select name="" id="" onChange={onChangeVariant}>
            {product.variants?.map((variant) => {
              return <option value={variant.id}>{variant.name}</option>;
            })}
          </select>
        )}
      </section>
    </article>
  );
}
