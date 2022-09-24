import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import Button from "../components/Utils/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Rating from "../components/Utils/Rating/Rating";
import ValueIncrement from "../components/ShoppingPreview/ValueIncrement/ValueIncrement";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setQuantity } from "../services/Cart/CartReducer";
import { toast } from "react-toastify";
import ReviewSection from "../components/ShoppingPreview/ReviewSection/ReviewSection";
import { Product } from "../services/Api/Product";
import Skeleton from "../components/Utils/Skeleton/Skeleton";

// carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

// import styles
import "swiper/css";
import "swiper/css/pagination";
import Tooltip from "../components/Tooltip/Tooltip";

import {
  changeSlide,
  IProductState,
  setImages,
  setProduct,
  setNumberOfItems,
  setVariant,
} from "../components/ShoppingPreview/ProductPreviewReducer";

export default function ProductPreview(props: any) {
  const location = useLocation();
  const dispatch = useDispatch();
  const state: IProductState = useSelector((state: any) => state.product);
  const [swiper, setSwiper] = useState<any>(null);

  const navigate = useNavigate();
  useEffect(() => {
    // if product null
    const PRODUCT_SLUG = location.pathname.split("/")[2] as string;

    Product.get(PRODUCT_SLUG)
      .then((res) => {
        dispatch(setProduct(res.data));
        dispatch(setImages(res.data.images));
      })
      .catch((err) => {
        navigate("/products/404");
      });
  }, []);

  function AddToCart() {
    if (state.product === null) return;

    if (state.variants.length > 0) {
      if (state.currentVariant === null) {
        toast.error("Please select a variant");
        return;
      }
      dispatch(
        addItem({
          ...state.product,
          variant: {
            name: state.currentVariant.name,
            price: state.currentVariant.price,
          },
          quantity: state.quantity,
        })
      );
    } else {
      dispatch(
        addItem({
          ...state.product,
          quantity: state.quantity,
        })
      );
    }
    toast.success("Added to cart");
  }

  function changeVariant(e: any) {
    if (state.product === null || state.product.slug == null) return;
    const option = e.target.value;
    Product.getVariantInfo(state.product.slug, option).then((res) => {
      dispatch(setVariant(res.data));
    });
  }

  return (
    <Layout>
      <section className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
        <section className="flex-1 order-2 lg:order-1 box-border px-4 w-full">
          <h1 className="my-8 text-3xl md:text-5xl text-slate-800">
            {state.loading ? <Skeleton type="title" /> : state.product?.name}
          </h1>
          <Rating value={0} className="my-5"></Rating>
          <p className="lg:w-1/2">
            {state.loading ? (
              <Skeleton type="text" />
            ) : (
              state.product?.description
            )}
          </p>

          {
            // if variants are available
            state.variants.length > 0 && (
              <section className=" mt-5 w-full lg:w-1/2">
                <h1 className="text-2xl my-8">Choose Variant</h1>
                <select name="" id="" onChange={changeVariant}>
                  {!state.loading &&
                    state.variants.map((variant: any, index: number) => (
                      <option key={index} value={variant.name}>
                        {variant.name}
                      </option>
                    ))}
                </select>
              </section>
            )
          }
          <h3 className="text-2xl font-light text-slate-800">
            {state.loading ? (
              <Skeleton type="title" />
            ) : (
              (state.currentVariant
                ? state.currentVariant.price.toFixed(2)
                : state.product?.price.toFixed(2)) + " €"
            )}
          </h3>
          <div className="flex items-center space-x-4 mt-8">
            <ValueIncrement
              value={state.quantity}
              onChange={(number) => {
                dispatch(setNumberOfItems(number));
              }}
            ></ValueIncrement>
            <Button type={"primary"} className="w-64" onClick={AddToCart}>
              Add to cart
            </Button>
            <AiOutlineShareAlt className="text-3xl" />
          </div>
        </section>
        <section className="flex-1 order-1 lg:order-2 relative overflow-hidden">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={false}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            loop={true}
            loopFillGroupWithBlank={true}
            direction={"vertical"}
            className="w-full h-96"
            onSwiper={(swiper) => setSwiper(swiper)}
          >
            {state.images?.map((image, index) => {
              return (
                <SwiperSlide>
                  <img src={image.image} alt="" className="w-full h-96" />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 text-red-50 select-none">
            <AiOutlineArrowUp
              className="text-4xl cursor-pointer"
              onClick={(e) => {
                dispatch(changeSlide("prev"));
              }}
            />
            <AiOutlineArrowDown
              className="text-4xl cursor-pointer"
              onClick={(e) => {
                dispatch(changeSlide("next"));
              }}
            />
          </div>
        </section>
      </section>

      <section className="px-4 mt-5 w-full lg:w-1/2">
        <h1 className="text-2xl my-8">Product parameters</h1>
        {state.currentVariant?.attributes?.map((attribute: any, _: number) => {
          return (
            <div
              className={`${
                _ % 2 ? "bg-slate-300" : "bg-slate-200"
              } px-8 py-2 flex justify-between`}
            >
              <Tooltip
                text={attribute.type.name}
                hint={attribute.type.description}
              ></Tooltip>
              <Tooltip
                text={attribute.value.value}
                hint={attribute.value.description}
              ></Tooltip>
            </div>
          );
        })}
        {state.attributes?.map((attribute: any, _: number) => {
          return (
            <div
              className={`${
                _ % 2 ? "bg-slate-300" : "bg-slate-200"
              } px-8 py-2 flex justify-between`}
            >
              <Tooltip
                text={attribute.type.name}
                hint={attribute.type.description}
              ></Tooltip>
              <Tooltip
                text={attribute.value.value}
                hint={attribute.value.description}
              ></Tooltip>
            </div>
          );
        })}
      </section>
      <div className="px-4 mt-16">
        {state.loading ? (
          <Skeleton type="text" />
        ) : (
          <ReviewSection
            {...{ loading: state.loading, reviews: state.reviews }}
          />
        )}

        <div>
          <h2 className="text-2xl my-8">Related products</h2>
        </div>
      </div>
    </Layout>
  );
}
