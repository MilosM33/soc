import React from "react";

export interface IBackdropProps {
  onClick?: () => void;
  isOpen: boolean;
}

export default function Backdrop(props: IBackdropProps) {
  return (
    <div
      className={`bg-black opacity-50 fixed w-full h-full top-0 left-0 z-20 ${
        props.isOpen ? "scale-100" : "scale-0"
      } `}
      onClick={() => {
        props.onClick?.();
      }}
    ></div>
  );
}
