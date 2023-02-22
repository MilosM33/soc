import React from "react";
import { Link } from "react-router-dom";

export interface NavLinkProps {
  children?: any;
  className?: string;
  to?: string;
  label?: string;
  primaryLink?: boolean;
}
export default function NavLink(props: NavLinkProps) {
  return (
    <li className="py-2 group list-none">
      <Link
        to={props.to ?? "#"}
        className={
          "relative before:absolute before:w-0 before:h-1 before:bg-red-400 before:-bottom-1 before:transition-all " +
          (props.primaryLink === true
            ? "before:group-hover:w-full"
            : "before:hover:w-full")
        }
      >
        {props.label ?? props.children}
      </Link>
      {props.label != null && props.children}
    </li>
  );
}
