import React from "react";
import Button from "../Components/Forms/Button/Button";
import Product from "../Components/Product/Product";
import SearchInput from "../Components/Forms/SearchInput/SearchInput";
import Layout from "../Layout/Layout";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BlackOverlay from "../Components/BlackOverlay/BlackOverlay";

export default function MainPage() {
  return (
    <Layout>
      <section className="container w-full mx-auto relative ">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="w-full"
          modules={[Thumbs, Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          speed={1000}
        >
          <SwiperSlide className="w-full md:px-16">
            <section className="w-full mt-[128px]">
              <h6 className="text-gray-500 text-xl">Best items ever</h6>
              <h1 className="text-4xl my-4 font-bold">Our Products</h1>
              <p className="w-full md:w-1/2 max-w-lg my-2 leading-8 text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae ipsa, esse explicabo laudantium tenetur, culpa rerum
                corporis amet adipisci aperiam quia error consequuntur
                exercitationem, minus pariatur illo consectetur! Enim laudantium
                pariatur vel nobis consequuntur sit nostrum laborum eum neque.
                Doloribus quae facere quidem ratione. Ullam cupiditate similique
                nihil quam beatae!
              </p>

              <Button variant="primary">Explore now</Button>
            </section>
          </SwiperSlide>
          <SwiperSlide className="w-full md:px-16">
            <section className="w-full mt-[128px]">
              <h6 className="text-gray-500 text-xl">Best items ever</h6>
              <h1 className="text-4xl my-4 font-bold">Our Products</h1>
              <p className="w-full md:w-1/2 max-w-lg my-2 leading-8 text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae ipsa, esse explicabo laudantium tenetur, culpa rerum
                corporis amet adipisci aperiam quia error consequuntur
                exercitationem, minus pariatur illo consectetur! Enim laudantium
                pariatur vel nobis consequuntur sit nostrum laborum eum neque.
                Doloribus quae facere quidem ratione. Ullam cupiditate similique
                nihil quam beatae!
              </p>

              <Button variant="primary">Explore now</Button>
            </section>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="container mx-auto my-10">
        <section className="w-1/2 mx-auto text-center">
          <h2 className="text-3xl my-4 font-bold text-red-400">
            Exclusive Products
          </h2>

          <section className="mt-5">
            <div className="flex justify-center items-center space-x-4">
              <SearchInput></SearchInput>
              <button className="px-4 py-2 my-2 bg-red-400  rounded-lg text-white">
                All
              </button>
              <button className="px-4 py-2 my-2 rounded-lg bg-gray-200 text-gray-500">
                Popular
              </button>
              <button className="px-4 py-2 my-2 rounded-lg bg-gray-200 text-gray-500">
                New
              </button>
            </div>
          </section>
        </section>
        <section className="relative">
          <div className="sticky top-1/2 left-[90%] w-fit text-white z-10 space-y-4 md:hidden">
            <AiOutlineArrowUp className="text-4xl bg-gray-500 p-2 rounded-full"></AiOutlineArrowUp>
            <AiOutlineArrowDown className="text-4xl bg-gray-500 p-2 rounded-full"></AiOutlineArrowDown>
          </div>
          <div className="my-5 grid justify-center grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Product key={index}></Product>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  );
}
