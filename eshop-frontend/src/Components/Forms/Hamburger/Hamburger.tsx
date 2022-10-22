import React from "react";
export interface HamburgerProps {
  onClick?: () => void;
}
export default function Hamburger(props: HamburgerProps) {
  return (
    <section>
      <div className="space-y-1 cursor-pointer" onClick={props.onClick}>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
      </div>
    </section>
  );
}
