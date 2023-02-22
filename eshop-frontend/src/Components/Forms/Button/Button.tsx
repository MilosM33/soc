import React from "react";

export interface ButtonProps {
  children: any;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant,
  type,
  children,
  onClick,
  className,
}: ButtonProps) {
  const buttonStyles = {
    primary: "bg-secondary  text-white",
    secondary: "bg-transparent text-secondary border border-secondary",
  };
  const universalStyles = "px-4 py-2 my-2 rounded-lg cursor-pointer ";
  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
      className={
        universalStyles + buttonStyles[variant ?? "primary"] + " " + className
      }
    >
      {children}
    </button>
  );
}
