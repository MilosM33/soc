import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import Button from "../components/Utils/Button/Button";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Rating from "../components/Utils/Rating/Rating";
import ValueIncrement from "../components/ShoppingPreview/ValueIncrement/ValueIncrement";
import VariantPicker from "../components/ShoppingPreview/VariantPicker/VariantPicker";
import { IShoppingItem } from "../components/ShoppingItem/ShoppingItem";
import { useDispatch } from "react-redux";
import { addItem, setQuantity } from "../services/Cart/CartReducer";
import { toast } from "react-toastify";
import ReviewSection from "../components/ShoppingPreview/ReviewSection/ReviewSection";
import { Product } from "../services/Api/Product";
import Skeleton from "../components/Utils/Skeleton/Skeleton";

export default function ProductPreview(props: any) {
  const location = useLocation();

  const [product, setProduct] = useState<IShoppingItem>(
    location.state as IShoppingItem
  );
  const [productState, setProductState] = useState({
    quantity: 1,
    price: product?.price ?? 0,
    loading: true,
  });

  useEffect(() => {
    if (product === null) {
      Product.get(location.pathname.split("/")[2] as string).then((res) => {
        setProduct(res.data);
        setProductState({
          ...productState,
          loading: false,
          price: res.data.price,
        });
      });
    } else {
      setProductState({ ...productState, loading: false });
    }
  }, []);

  const dispatch = useDispatch();

  function AddToCart() {
    dispatch(addItem(product));
    dispatch(
      setQuantity({
        itemId: product.name,
        quantity: productState.quantity,
      })
    );
    toast.success("Added to cart");
  }

  return (
    <Layout>
      <section className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
        <section className="flex-1 order-2 lg:order-1 box-border px-4 w-full">
          <h1 className="my-8 text-3xl md:text-5xl text-slate-800">
            {productState.loading ? <Skeleton type="title" /> : product.name}
          </h1>
          <Rating value={0} className="my-5"></Rating>
          <p className="lg:w-1/2">
            {productState.loading ? (
              <Skeleton type="text" />
            ) : (
              product.description
            )}
          </p>

          <VariantPicker></VariantPicker>
          <h3 className="text-2xl font-light text-slate-800">
            {productState.loading ? (
              <Skeleton type="title" />
            ) : (
              productState.price + " €"
            )}
          </h3>
          <div className="flex items-center space-x-4 mt-8">
            <ValueIncrement
              value={productState.quantity}
              onChange={(number) => {
                setProductState({
                  ...productState,
                  quantity: number,
                  price: Math.floor(product.price * number * 100) / 100,
                });
              }}
            ></ValueIncrement>
            <Button type={"primary"} className="w-64" onClick={AddToCart}>
              Add to cart
            </Button>
            <AiOutlineShareAlt className="text-3xl" />
          </div>
        </section>
        <section className="flex-1 order-1 lg:order-2">
          <img src={product?.img_path ?? ""} alt="" />
        </section>
      </section>

      <div className="px-4 mt-16">
        {productState.loading ? (
          <Skeleton type="text" />
        ) : (
          <ReviewSection slug={product.slug} />
        )}

        <div>
          <h2 className="text-2xl my-8">Related products</h2>
        </div>
      </div>
    </Layout>
  );
}
