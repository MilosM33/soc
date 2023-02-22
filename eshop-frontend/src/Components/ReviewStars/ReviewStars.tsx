import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
export interface ReviewStarsProps {
  rating: number;
  canRate?: boolean;
  onRate?: (rating: number) => void;
  key?: number;
}

export default function ReviewStars(props: ReviewStarsProps) {
  const [rating, setRating] = useState(props.rating);
  function onMouseEnter(e: any, starId: number) {
    if (props.canRate) setRating(starId + 1);
  }

  function onMouseLeave(e: any) {
    setRating(props.rating);
  }
  function onMouseClick(e: any, i: number) {
    if (props.canRate) {
      props.onRate?.(i);
    }
  }

  return (
    <section
      className="flex gap-2 my-2 select-none"
      onMouseLeave={onMouseLeave}
      key={props.key}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <AiFillStar
          key={i}
          className={
            "transition-colors duration-200 cursor-pointer " +
            (i < rating ? "text-red-400" : "text-red-200")
          }
          onMouseEnter={(e) => onMouseEnter(e, i)}
          onClick={(e) => onMouseClick(e, i)}
        ></AiFillStar>
      ))}
    </section>
  );
}
