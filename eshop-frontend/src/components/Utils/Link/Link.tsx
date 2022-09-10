import React from "react";
import { Link as Url } from "react-router-dom";
import "./Link.css";
export default function Link(props: any) {
  return (
    <Url
      to={props.to}
      className={`navbar-link ${props.theme === "dark" ? "dark" : ""} ${
        props.className
      }`}
    >
      {props.children}
    </Url>
  );
}
