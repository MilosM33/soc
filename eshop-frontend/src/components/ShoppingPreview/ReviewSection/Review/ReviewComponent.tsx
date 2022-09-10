import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Rating from "../../../Utils/Rating/Rating";

export interface IReviewProps {
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  is_Author?: boolean;
}

export default function ReviewComponent(props: IReviewProps) {
  return (
    <article className="space-y-3">
      <div className="flex justify-between">
        <h2>{props.name}</h2>
        {props.is_Author === true && (
          <div className="flex gap-4">
            <AiFillEdit />
            <AiFillDelete />
          </div>
        )}
      </div>
      <Rating value={props.rating}></Rating>
      <small>{props.created_at}</small>
      <p>{props.comment}</p>
      <hr className="border-2 border-slate-300" />
    </article>
  );
}
