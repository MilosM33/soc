import React from "react";
import NavLink from "../NavLink/NavLink";
export default function MegaMenu(props: any) {
  return (
    <section className="absolute top-full left-0 w-full bg-white shadow-lg max-h-0 group-hover:max-h-[500px] transition-all duration-300 overflow-hidden">
      <hr />
      <div className="container py-8 mx-auto flex relative max-h-[50%]">
        <section className="px-8 w-64 relative transition-all duration-300 delay-200 translate-y-full group-hover:translate-y-0  ">
          <h1 className="text-xl my-2">Test</h1>
          <ul>
            <NavLink label="Test" className=""></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
          </ul>
        </section>
        <section className="px-8 w-64 relative transition-all duration-300 delay-200 translate-y-full group-hover:translate-y-0  ">
          <h1 className="text-xl my-2">Test</h1>
          <ul>
            <NavLink label="Test" className=""></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
          </ul>
        </section>
        <section className="px-8 w-64 relative transition-all duration-300 delay-200 translate-y-full group-hover:translate-y-0  ">
          <h1 className="text-xl my-2">Test</h1>
          <ul>
            <NavLink label="Test" className=""></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
            <NavLink label="Test"></NavLink>
          </ul>
        </section>
      </div>
    </section>
  );
}
