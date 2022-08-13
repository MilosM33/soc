import React from "react";

export interface IButtonProps {
  type?: "primary" | "secondary" | "submit";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

function ButtonPrimary(props: any) {
  return (
    <button
      className={
        "border-2 block text-white bg-slate-800 px-8 py-2 w-full font-normal hover:bg-slate-900 " +
        props.className
      }
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
function ButtonSecondary(props: any) {
  return (
    <button
      className={
        "border-2 block border-slate-800 px-8 py-2 w-full font-normal " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default function Button(props: IButtonProps) {
  switch (props.type) {
    case "primary":
      return (
        <ButtonPrimary className={props.className} onClick={props.onClick}>
          {props.children}
        </ButtonPrimary>
      );
    case "submit":
      return (
        <ButtonPrimary
          type="submit"
          className={props.className}
          onClick={props.onClick}
        >
          {props.children}
        </ButtonPrimary>
      );
    case "secondary":
      return (
        <ButtonSecondary className={props.className} onClick={props.onClick}>
          {props.children}
        </ButtonSecondary>
      );
    default:
      return (
        <ButtonPrimary className={props.className} onClick={props.onClick}>
          {props.children}
        </ButtonPrimary>
      );
  }
}
