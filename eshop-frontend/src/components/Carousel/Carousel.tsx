import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Slide } from "./Slide/Slide";
import { Navigation, Pagination, Autoplay } from "swiper";

// import styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
  return (
    <section className="w-full h-[600px] ">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
        loopFillGroupWithBlank={true}
        className="w-full h-full"
      >
        <SwiperSlide>
          <Slide
            title={"test"}
            description={""}
            image={"https://via.placeholder.com/1500x600"}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            title={""}
            description={""}
            image={"https://via.placeholder.com/1500x600"}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            title={""}
            description={""}
            image={"https://via.placeholder.com/1500x600"}
          ></Slide>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
