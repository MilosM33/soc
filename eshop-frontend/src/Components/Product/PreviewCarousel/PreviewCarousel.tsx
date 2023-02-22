import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useState } from "react";
import Skeleton from "../../Skeleton/Skeleton";
export default function PreviewCarousel(props: any) {
  const [swiperLarge, setSwiperLarge] = useState<any>(null);
  const [swiperSmall, setSwiperSmall] = useState<any>(null);
  function changeSlide(slideId: number) {
    swiperLarge.slideTo(slideId);
    swiperSmall.slideTo(slideId);
  }

  useEffect(() => {
    swiperLarge?.update();
    swiperSmall?.update();
  }, [props.images]);

  return (
    <section className="flex flex-col space-x-4 max-h-[512px] h-screen overflow-hidden md:flex-row">
      <Swiper
        slidesPerView={4}
        className="w-full h-32 order-2 md:order-1 md:w-32 md:h-full"
        direction="vertical"
        spaceBetween={50}
        loop={true}
        breakpoints={{
          320: {
            direction: "horizontal",
          },
          800: {
            direction: "vertical",
          },
        }}
        onSwiper={setSwiperSmall}
      >
        {props.images?.length === 0 && (
          <SwiperSlide className="w-full aspect-square">
            <Skeleton className="w-full h-full"></Skeleton>
          </SwiperSlide>
        )}
        {props.images?.length > 0 &&
          props.images.map((image: any, i: number) => (
            <SwiperSlide
              className="w-full h-full aspect-square"
              key={Math.random() % 99999}
              onClick={() => changeSlide(i)}
            >
              <img
                src={image}
                className="w-full aspect-square object-fit"
                alt=""
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={setSwiperLarge}
        className="w-full lg:max-w-lg order-1"
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {props.images?.length === 0 && (
          <SwiperSlide className="w-full aspect-square">
            <Skeleton className="w-full h-full"></Skeleton>
          </SwiperSlide>
        )}
        {props.images &&
          props.images.map((image: any, i: number) => (
            <SwiperSlide
              className="w-full"
              style={{
                width: "100%",
              }}
            >
              <img
                src={image}
                className="w-full h-[512px] lg:h-auto lg:aspect-square object-fit select-none"
                alt=""
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
