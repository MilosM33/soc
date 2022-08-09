import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Slide, ISlideProps } from "./Slide/Slide";
import { useEffect, useState } from "react";
import React from "react";
export default function Carousel() {
  const [carousel, setCarousel] = useState({
    index: 0,
    slides: [
      {
        image: "https://picsum.photos/200/300",
        title: "Test1",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, quae porro error sint praesentium excepturi perspiciatis quibusdam, dolorem, veritatis quaerat at. Placeat culpa in dolore temporibus cupiditate ea, consequuntur harum.",
        direction: "current",
      },
      {
        image: "https://picsum.photos/200/300",
        title: "Test2",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, quae porro error sint praesentium excepturi perspiciatis quibusdam, dolorem, veritatis quaerat at. Placeat culpa in dolore temporibus cupiditate ea, consequuntur harum.",
      },
      {
        image: "https://picsum.photos/200/300",
        title: "Test3",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, quae porro error sint praesentium excepturi perspiciatis quibusdam, dolorem, veritatis quaerat at. Placeat culpa in dolore temporibus cupiditate ea, consequuntur harum.",
      },
    ],
  });

  function nextSlide() {
    const newCarousel = { ...carousel };
    const slides = newCarousel.slides;
    slides[newCarousel.index].direction = "next";
    newCarousel.index = (newCarousel.index + 1) % slides.length;
    slides[newCarousel.index].direction = "current";
    if (newCarousel.index === slides.length - 1) {
      slides[0].direction = "right";
    }
    setCarousel(newCarousel);
  }
  function prevSlide() {
    const newCarousel = { ...carousel };
    const slides = newCarousel.slides;
    slides[newCarousel.index].direction = "prev";
    console.log(newCarousel.index);
    newCarousel.index -= 1;
    if (newCarousel.index < 0) {
      newCarousel.index = slides.length - 1;
    }
    slides[newCarousel.index].direction = "current";
    if (newCarousel.index === 0) {
      slides[slides.length - 1].direction = "left";
    }

    setCarousel(newCarousel);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  });
  return (
    <div className="relative group">
      <div className="relative overflow-hidden" style={{ height: 750 }}>
        {carousel.slides.map((slide: ISlideProps) => {
          return <Slide key={slide.title} {...slide} />;
        })}
      </div>

      <button className="text-4xl absolute top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 duration-300 z-50">
        <BsChevronLeft onClick={prevSlide}></BsChevronLeft>
      </button>
      <button className="text-4xl absolute top-1/2 -translate-y-1/2 right-0 text-white opacity-0 group-hover:opacity-100 duration-300 z-50">
        <BsChevronRight onClick={nextSlide}></BsChevronRight>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white flex space-x-2 items-center">
        <div className="w-2 h-2 bg-red-500 rounded-full scale-150"></div>
        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
      </div>
    </div>
  );
}
