import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../Components/Cart/Cart";
import SearchInput from "../Components/Forms/SearchInput/SearchInput";

import Hamburger from "../Components/Forms/Hamburger/Hamburger";
import MegaMenu from "../Components/Navigation/MegaMenu/MegaMenu";
import NavLink from "../Components/Navigation/NavLink/NavLink";
export default function Header() {
  return (
    <header className="w-full sticky top-0 bg-white shadow-lg z-10 ">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center text-primary">
        <Hamburger></Hamburger>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <NavLink to="#" label="Home" primaryLink></NavLink>
            <NavLink to="#" label="Products" primaryLink>
              <MegaMenu></MegaMenu>
            </NavLink>
            <NavLink to="#" label="About" primaryLink>
              {" "}
            </NavLink>
          </ul>
        </nav>
        <section className="flex gap-2 items-center justify-end">
          <SearchInput></SearchInput>
          <Cart></Cart>
        </section>
      </nav>
    </header>
  );
}
