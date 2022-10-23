import React, { useEffect } from "react";
import Layout from "../Layout/Layout";

import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Button from "../Components/Forms/Button/Button";
import TextInput from "../Components/Forms/TextInput/TextInput";
import BreadCrumbs from "../Components/BreadCrumbs/BreadCrumbs";
import PreviewCarousel from "../Components/Product/PreviewCarousel/PreviewCarousel";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Preview() {
  useEffect(() => {}, []);
  return (
    <Layout>
      <div className="container mx-auto">
        <section className="py-8 pb-16 flex flex-col gap-4 lg:flex-row lg:gap-8">
          <section className="flex space-x-4 max-h-[512px] h-screen overflow-hidden">
            <PreviewCarousel></PreviewCarousel>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSwiper={(swiper) => console.log(swiper)}
              className="w-full lg:max-w-lg"
              loop={true}
              modules={[Pagination, Navigation, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide className="w-full">
                <img
                  src="https://via.placeholder.com/512"
                  className="w-full h-[512px] lg:h-auto lg:aspect-square object-fit"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="w-full">
                <img
                  src="https://via.placeholder.com/512"
                  className="w-full h-[512px] lg:h-auto lg:aspect-square object-fit"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </section>
          <section className="flex-1">
            <BreadCrumbs></BreadCrumbs>
            <h1 className="text-2xl text-primary uppercase">
              Fiera shirt and trousers
            </h1>
            <section className="flex gap-2 my-2">
              <AiFillStar className="text-red-400"></AiFillStar>
              <AiFillStar className="text-red-400"></AiFillStar>
              <AiFillStar className="text-red-400"></AiFillStar>
              <AiFillStar className="text-red-100"></AiFillStar>
              <AiFillStar className="text-red-100"></AiFillStar>
            </section>
            <h2 className="text-2xl text-primary font-medium"> 128.00 €</h2>
            <p className="text-gray-500 leading-8 md:w-1/2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              itaque quod eligendi quis debitis nulla ipsam. Minima ex
              necessitatibus omnis quaerat eum itaque sunt, distinctio tempore
              earum voluptatum aut illum.
            </p>
            <div className="flex items-center space-x-2">
              <AiOutlineMinus className="text-2xl" />
              <TextInput
                placeholder="Quantity"
                value="1"
                className="w-8 text-center"
              ></TextInput>
              <AiOutlinePlus className="text-2xl" />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <Button variant="primary" className="w-48">
                Add to Cart
              </Button>
              <Button variant="secondary" className="w-48">
                <AiOutlineHeart className="text-2xl text-primary inline"></AiOutlineHeart>
                Add to Wishlist
              </Button>
            </div>
          </section>
        </section>

        <section>
          {/*
            HTML SECTION
          */}
        </section>
        <section className="mb-8">
          <h1 className="text-2xl text-primary uppercase">
            Product parameters
          </h1>
          <section className="w-full md:w-1/2 mx-auto space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Color</span>
              <span className="text-gray-500">Black</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Color</span>
              <span className="text-gray-500">Black</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Color</span>
              <span className="text-gray-500">Black</span>
            </div>
          </section>
        </section>
        <section className="mb-8">
          <h1 className="text-2xl text-primary uppercase">Reviews</h1>

          <section className="w-full md:w-1/2 mx-auto space-y-4">
            <article className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <img
                  src="https://via.placeholder.com/128"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <div>
                  <h3 className="text-primary text-lg">Name</h3>
                  <small className="text-gray-400">January 31,2022</small>
                  <p className="leading-8 text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Non, Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Non, Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Non,
                  </p>
                </div>
              </div>
              <section className="flex">
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-100"></AiFillHeart>
                <AiFillHeart className="text-red-100"></AiFillHeart>
              </section>
            </article>
            <article className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <img
                  src="https://via.placeholder.com/128"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <div>
                  <h3 className="text-primary text-lg">Name</h3>
                  <small className="text-gray-400">January 31,2022</small>
                  <p className="leading-8 text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Non, Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Non, Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Non,
                  </p>
                </div>
              </div>
              <section className="flex">
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-100"></AiFillHeart>
                <AiFillHeart className="text-red-100"></AiFillHeart>
              </section>
            </article>
            <article className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <img
                  src="https://via.placeholder.com/128"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <div>
                  <h3 className="text-primary text-lg">Name</h3>
                  <small className="text-gray-400">January 31,2022</small>
                  <p className="leading-8 text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Non, Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Non, Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Non,
                  </p>
                </div>
              </div>
              <section className="flex">
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-400"></AiFillHeart>
                <AiFillHeart className="text-red-100"></AiFillHeart>
                <AiFillHeart className="text-red-100"></AiFillHeart>
              </section>
            </article>
          </section>
        </section>
        <section className="mb-8">
          <h1 className="text-2xl text-primary uppercase">Related products</h1>
        </section>
      </div>
    </Layout>
  );
}
