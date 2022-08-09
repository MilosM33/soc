import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
export interface IRatingProps {
  value: number;
  className?: string;
}
export default function Rating(props: IRatingProps) {
  return (
    <div className={"flex items-center space-x-2 " + props.className}>
      {[...Array(5)].map((_, index) => {
        const active = index < props.value;
        if (active) return <AiFillStar></AiFillStar>;
        else return <AiOutlineStar></AiOutlineStar>;
      })}
    </div>
  );
}
