import React from "react";

export interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  defaultSize?: boolean;
}
export default function IconButton(props: IconButtonProps) {
  return (
    <div
      className={
        (props.defaultSize ? "text-2xl" : "") +
        " cursor-pointer select-none " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
IconButton.defaultProps = {
  defaultSize: true,
};