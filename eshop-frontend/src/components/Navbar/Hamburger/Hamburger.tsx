import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const handleMouseOver = () => {
    setMouseOver(!mouseOver);
  };
  return (
    <div
      className="w-10 h-10 cursor-pointer overflow-hidden relative  flex flex-col items-center justify-center"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOver}
      onClick={toggle}
    >
      <div
        className={`w-full h-1 bg-slate-900 rounded-lg absolute duration-1000 ${
          mouseOver ? "top-5 rotate-[765deg]" : "top-2"
        }`}
      ></div>
      <div
        className={`w-full h-1 bg-slate-900 rounded-lg absolute duration-1000 top-5 ${
          mouseOver ? "translate-x-full opacity-0" : ""
        }`}
      ></div>
      <div
        className={`w-full h-1 bg-slate-900 rounded-lg absolute duration-1000 ${
          mouseOver ? "top-5 rotate-[-765deg]" : "top-8"
        }`}
      ></div>

      <section
        className={`fixed bg-white w-full h-screen top-0 left-0 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full z-30"
        } duration-250 transition-all`}
      >
        <nav className="flex flex-col lg:flex-row lg:h-full">
          <section className="p-4 w-full lg:w-16 bg-slate-300">
            <div className="grid grid-cols-3 lg:grid-cols-1 h-1/2 justify-items-center">
              <AiOutlineClose></AiOutlineClose>
              <BiUser></BiUser>
              <AiOutlineHeart></AiOutlineHeart>
              
            </div>
          </section>
          <section className="flex-1">test</section>
        </nav>
        <section></section>
      </section>
    </div>
  );
}
