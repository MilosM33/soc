import React, { useEffect } from "react";
import Layout from "../Layout/Layout";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import Button from "../Components/Forms/Button/Button";
import BreadCrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import PreviewCarousel from "../Components/Product/PreviewCarousel/PreviewCarousel";

import { Product } from "../Api/Product/Product";
import IProductPreview from "../Components/Product/IProductPreview";
import { useState } from "react";
import ReviewStars from "../Components/ReviewStars/ReviewStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../Reducers/Cart/CartReducer";
import { ICartItem, ICartItemVariant } from "../Reducers/Cart/ICartItem";
import ValueIncrement from "../Components/Forms/ValueIncrement/ValueIncrement";
import { useLocation, useNavigate, useParams } from "react-router";
import Select from "../Components/Forms/Select/Select";
import ReviewSection from "../Components/Product/ReviewSection/ReviewSection";
import AttributeSection from "../Components/Product/AttributeSection/AttributeSection";
import Skeleton from "../Components/Skeleton/Skeleton";
import { toast } from "react-toastify";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

export default function Preview() {
  const location = useLocation();

  const [product, setProduct] = useState<IProductPreview>();
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("loading");
  const dispatch = useDispatch();

  function addProductToCart() {
    if (product == null) return;

    // Preview Variant to CartVariant
    const variants: ICartItemVariant[] = product.variants.map((variant) => {
      return {
        id: variant.id,
        name: variant.name,
        price: variant.price,
        images: variant.images,
      };
    });

    const selectedVariant = variants.find(
      (variant) => variant.id === product.selectedVariant.id
    );

    if (selectedVariant == null) return;
    const item: ICartItem = {
      ...product,
      variants: variants,
      selectedVariant,
      quantity: quantity,
    };

    dispatch(addToCart(item));
  }
  function changeVariant(value: any) {
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
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setStatus("loading");
    if (slug == null) {
      navigate("/");
      return;
    }

    Product.getProduct(slug).then((res) => {
      setProduct(res.data["data"]);
      setStatus("success");
    });
  }, [slug]);

  const [isFavorite, setIsFavorite] = useState(false);
  function toggleFavorite() {
    setIsFavorite(!isFavorite);
    if (isFavorite == false) {
      toast.success("Product added to favorites");
    } else {
      toast.error("Product removed from favorites");
    }
    const wishlistedProducts = localStorage.getItem("wishlistedProducts");
    if (wishlistedProducts == null) {
      localStorage.setItem("wishlistedProducts", JSON.stringify([product]));
      return;
    } else {
      const products = JSON.parse(wishlistedProducts);
      const index = products.findIndex((p: any) => p.slug === product?.slug);
      if (index === -1) {
        products.push(product);
        localStorage.setItem("wishlistedProducts", JSON.stringify(products));
      } else {
        products.splice(index, 1);
        localStorage.setItem("wishlistedProducts", JSON.stringify(products));
      }
    }
  }
  useEffect(() => {
    const wishlistedProducts = localStorage.getItem("wishlistedProducts");
    if (wishlistedProducts == null) return;
    const products = JSON.parse(wishlistedProducts);
    const index = products.findIndex((p: any) => p.slug === slug);

    if (index !== -1) {
      setIsFavorite(true);
    }
  }, []);
  return (
    <Layout>
      <div className="container mx-auto">
        <BreadCrumbs></BreadCrumbs>
        <section className="py-8 pb-16 flex flex-col gap-4 lg:flex-row lg:gap-8">
          <PreviewCarousel
            images={product?.selectedVariant.images ?? []}
          ></PreviewCarousel>

          <section className="flex-1">
            <h1 className="text-2xl text-primary uppercase">
              {product?.title || <Skeleton />}
            </h1>
            <ReviewStars
              rating={product?.selectedVariant.rating ?? 0}
              key={product?.selectedVariant.rating ?? 0}
            ></ReviewStars>
            <h2 className="text-2xl text-primary font-medium">
              {product?.selectedVariant.price || <Skeleton />} €
            </h2>
            <p className="text-gray-500 leading-8 md:w-1/2">
              {product?.description || <Skeleton />}
            </p>

            <div className="w-48 my-4">
              <Select
                options={product?.variants.map((variant) => variant.name) ?? []}
                placeholder={"Select Variant"}
                onChange={changeVariant}
                selected={product?.selectedVariant.name}
              ></Select>
            </div>
            <ValueIncrement
              value={quantity}
              onChange={(value) => setQuantity(value)}
              min={1}
            ></ValueIncrement>

            <div className="flex flex-col items-start space-y-2">
              <Button
                variant="primary"
                className="w-48"
                onClick={addProductToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                className="w-48"
                onClick={() => toggleFavorite()}
              >
                {isFavorite ? (
                  <AiFillHeart className="text-2xl mx-2 inline"></AiFillHeart>
                ) : (
                  <AiOutlineHeart className="text-2xl mx-2 inline"></AiOutlineHeart>
                )}
                Add to Wishlist
              </Button>
            </div>
          </section>
        </section>

        <section></section>
        <section className="mb-8">
          {status === "loading" &&
            Array.from(Array(10).keys()).map((key) => (
              <Skeleton className="my-2"></Skeleton>
            ))}
          {status === "success" && (
            <AttributeSection
              attributes={
                [
                  ...(product?.selectedVariant.attributes ?? []),
                  ...(product?.attributes ?? []),
                ] ?? []
              }
            ></AttributeSection>
          )}
        </section>
        {status == "success" && (
          <ReviewSection
            reviews={product?.selectedVariant.reviews ?? []}
            variantId={product?.selectedVariant.id ?? 0}
            setReviews={(reviews) => {
              if (product == null) return;
              setProduct({
                ...product,
                selectedVariant: {
                  ...product.selectedVariant,
                  reviews,
                },
              });
            }}
          ></ReviewSection>
        )}
        {status == "loading" &&
          Array.from(Array(10).keys()).map((key) => (
            <Skeleton className="my-2"></Skeleton>
          ))}
        <RelatedProducts></RelatedProducts>
      </div>
    </Layout>
  );
}
