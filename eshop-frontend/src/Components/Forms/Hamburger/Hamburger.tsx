import React from "react";

export default function Hamburger(props: any) {
  return (
    <section>
      <div className="space-y-2 my-2 cursor-pointer" onClick={props.OnClick}>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
      </div>
    </section>
  );
}
