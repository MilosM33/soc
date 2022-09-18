import React, { useState } from "react";
import { useSelector } from "react-redux";
import Auth from "./Auth";

export interface IAuthCheckProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function AuthCheck(props: any) {
  const loggedIn = useSelector((state: any) => state.user.loggedIn);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        if (loggedIn) {
          props.onClick?.();
        } else if (!isOpen) {
          setIsOpen(true);
        }
      }}
    >
      {props.children}
      {isOpen && <Auth onClose={() => setIsOpen(false)} />}
    </div>
  );
}
