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

import { Link, useNavigate } from "react-router-dom";
import ImagePreview from "./ImagePreview/ImagePreview";
import Select from "../Forms/Select/Select";
import { useLocation, useParams } from "react-router";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Reducers/Wishlist/WishlistReducer";
import { toast } from "react-toastify";

export default function ProductListing(props: IProductListing) {
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductListing>({ ...props });
  const location = useLocation();
  const params = useParams();

  console.log(params)
  let path = "";

  if (location.pathname !== "/") {
    path = location.pathname;
  }
  let PRODUCT_URL = path + "/product/" + product.slug;

  if(params.slug){
    PRODUCT_URL = "/product/" + product.slug;
  }

  useEffect(() => {
    const wishlistedProducts = localStorage.getItem("wishlistedProducts");
    if (wishlistedProducts == null) return;
    const products = JSON.parse(wishlistedProducts);
    const index = products.findIndex(
      (p: IProductListing) => p.id === product.id
    );
    if (index !== -1) {
      setIsFavorite(true);
    }
  }, []);

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      dispatch(addToWishlist(product));
      toast.success("Product added to wishlist");
    }
    else{
      dispatch(removeFromWishlist(product));
      toast.error("Product removed from wishlist");
    }
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

  function onChangeVariant(value: any) {
    if (product == null) return;
    const variantName = value.target.value;
    const selectedVariant = product?.variants.find(
      (v) => v.name === variantName
    );
    if (selectedVariant == null) return;

    setProduct({
      ...product,
      selectedVariant,
    });
  }

  return (
    <article
      className="w-full max-w-sm md:max-w-none mx-auto cursor-pointer"
      key={props.key}
    >
      <section className="relative w-full">
        <Link to={PRODUCT_URL}>
          <ImagePreview
            images={[
              product.selectedVariant?.images[0],
              product.selectedVariant?.images[1],
            ]}
          ></ImagePreview>
        </Link>
        <div className="absolute w-full px-4 flex justify-between bottom-4 left-0">
          <div
            className="bg-white p-2 rounded-full"
            onClick={() => toggleFavorite()}
          >
            {isFavorite ? (
              <AiFillHeart className="text-2xl text-red-400 hover:text-red-200" />
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
        onRate={() => navigate(PRODUCT_URL)}
        canRate={true}
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
        <Select
          options={product?.variants.map((variant) => variant.name) ?? []}
          placeholder={"Select Variant"}
          onChange={onChangeVariant}
          selected={product?.selectedVariant.name}
          maxHeight={"200px"}
        ></Select>
      </section>
    </article>
  );
}
