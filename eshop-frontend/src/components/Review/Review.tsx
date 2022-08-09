import React from "react";
import Rating from "../Rating/Rating";

export default function Review() {
  return (
    <article className="space-y-3">
      <h2>Michal, Žilina</h2>
      <Rating value={4}></Rating>
      <small>28.2.2003</small>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
        officiis odit facilis?
      </p>
      <hr className="border-2 border-slate-300" />
    </article>
  );
}
