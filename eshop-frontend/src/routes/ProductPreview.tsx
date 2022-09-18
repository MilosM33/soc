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

// carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

// import styles
import "swiper/css";
import "swiper/css/pagination";
import Tooltip from "../components/Tooltip/Tooltip";

export default function ProductPreview(props: any) {
  const location = useLocation();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<IShoppingItem>(
    location.state as IShoppingItem
  );

  const [attributes, setAttributes] = useState<any>([]);

  const [productState, setProductState] = useState({
    quantity: 1,
    price: product?.price ?? 0,
    loading: true,
  });
  const [swiper, setSwiper] = useState<any>(null);

  function changeSlide(e: any, direction: string) {
    if (direction === "up") {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  }
  useEffect(() => {
    // if product null
    const PRODUCT_SLUG = location.pathname.split("/")[2] as string;
    if (product === null) {
      Product.get(PRODUCT_SLUG).then((res) => {
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

    // attributes
    Product.getAttributes(PRODUCT_SLUG).then((res) => {
      setAttributes(res.data);
    });
  }, []);

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

          <section className=" mt-5 w-full lg:w-1/2">
            <h1 className="text-2xl my-8">Choose Variant</h1>
            <select name="" id="">
              <option value=""></option>
            </select>
          </section>
          <h3 className="text-2xl font-light text-slate-800">
            {productState.loading ? (
              <Skeleton type="title" />
            ) : (
              productState.price.toFixed(2) + " €"
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
            <SwiperSlide>
              {product.images.map((image, index) => {
                return <img src={image.image} alt="" className="w-full h-96" />;
              })}
            </SwiperSlide>
          </Swiper>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 text-red-50 select-none">
            <AiOutlineArrowUp
              className="text-4xl cursor-pointer"
              onClick={(e) => {
                changeSlide(e, "up");
              }}
            />
            <AiOutlineArrowDown
              className="text-4xl cursor-pointer"
              onClick={(e) => {
                changeSlide(e, "down");
              }}
            />
          </div>
        </section>
      </section>

      <section className="px-4 mt-5 w-full lg:w-1/2">
        <h1 className="text-2xl my-8">Product parameters</h1>
        {attributes.map((attribute: any, _: number) => {
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
