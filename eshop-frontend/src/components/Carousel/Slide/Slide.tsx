import React from "react";

export interface ISlideProps {
  title: string;
  description: string;
  image: string;
  direction?: string;
}

export function Slide(props: ISlideProps) {
  function handleDirection() {
    if (props.direction === "left") {
      return "-translate-x-full opacity-0";
    } else if (props.direction === "right") {
      return "translate-x-full opacity-0";
    } else if (props.direction === "current") {
      return "translate-x-0";
    } else if (props.direction === "next") {
      return "translate-x-full";
    } else if (props.direction === "prev") {
      return "-translate-x-full";
    }
  }
  return (
    <div
      className={`w-full h-full absolute top-0 ${handleDirection()} duration-1000`}
    >
      <img src={props.image} alt="" className="w-full h-full object-cover" />

      <div className="absolute top-1/2 -translate-y-1/2 px-4 md:px-48">
        <h1 className="text-4xl text-slate-800 font-medium my-2 tracking-wider">
          {props.title}
        </h1>
        <p className="text-slate-800 tracking-wider font-thin w-96">
          {props.description}
        </p>
      </div>
    </div>
  );
}
