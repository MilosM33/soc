import React from "react";
import { useEffect } from "react";

export interface BlackOverlayProps {
  isOpen: boolean;
}

export default function BlackOverlay(props: BlackOverlayProps) {
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflowY = props.isOpen ? "hidden" : "auto";
    }
  }, [props.isOpen]);

  return (
    <div
      className={
        "fixed z-10 top-0 left-0 w-full h-full bg-primary opacity-90 " +
        (!props.isOpen ? "hidden" : "")
      }
    ></div>
  );
}
