import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import Button from "../components/Button/Button";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Rating from "../components/Rating/Rating";
import ValueIncrement from "../components/ValueIncrement/ValueIncrement";
import VariantPicker from "../components/VariantPicker/VariantPicker";
import Review from "../components/Review/ReviewComponent";
import { Product } from "../services/Api/Product";
import { IShoppingItem } from "../components/ShoppingItem/ShoppingItem";
import { useDispatch } from "react-redux";
import { addItem, setQuantity } from "../services/Cart/CartReducer";
import { toast } from "react-toastify";
import ReviewSection from "../components/ReviewSection/ReviewSection";

export default function ProductPreview(props: any) {
  const location = useLocation();

  const [product, setProduct] = useState<IShoppingItem>(
    location.state as IShoppingItem
  );
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(product.price);
  const dispatch = useDispatch();
  function AddToCart() {
    dispatch(addItem(product));
    dispatch(
      setQuantity({
        itemId: product.name,
        quantity: count,
      })
    );
    toast.success("Added to cart");
  }

  return (
    <Layout>
      <section className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
        <section className="flex-1 order-2 lg:order-1 box-border px-4 w-full">
          <h1 className="my-8 text-3xl md:text-5xl text-slate-800">
            {product.name}
          </h1>
          <Rating value={0} className="my-5"></Rating>
          <p className="lg:w-1/2">{product.description}</p>

          <VariantPicker></VariantPicker>
          <h3 className="text-2xl font-light text-slate-800">{price} €</h3>
          <div className="flex items-center space-x-4 mt-8">
            <ValueIncrement
              value={count}
              onChange={(number) => {
                setCount(number);
                setPrice(Math.floor(number * product.price * 100) / 100);
              }}
            ></ValueIncrement>
            <Button type={"primary"} className="w-64" onClick={AddToCart}>
              Add to cart
            </Button>
            <AiOutlineShareAlt className="text-3xl" />
          </div>
        </section>
        <section className="flex-1 order-1 lg:order-2">
          <img src={require("./placeholder.png")} alt="" />
        </section>
      </section>

      <div className="px-4 mt-16">
        <ReviewSection slug={product.slug}></ReviewSection>

        <div>
          <h2 className="text-2xl my-8">Related products</h2>
        </div>
      </div>
    </Layout>
  );
}
