import React from "react";
import { useDispatch } from "react-redux";
import { setHamburger } from "../../../Reducers/Hamburger/HamburgerReducer";

export default function Hamburger(props: any) {
  const dispatch = useDispatch();
  return (
    <section>
      <div
        className="space-y-2 my-2 cursor-pointer"
        onClick={() => {
          dispatch(setHamburger(true));
        }}
      >
        <div className="w-7 h-1 bg-primary rounded-full"></div>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
        <div className="w-7 h-1 bg-primary rounded-full"></div>
      </div>
    </section>
  );
}
