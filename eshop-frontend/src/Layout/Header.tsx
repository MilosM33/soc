import React, { useEffect } from "react";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import Cart from "../Components/Cart/Cart";
import SearchInput from "../Components/Forms/SearchInput/SearchInput";
import IconButton from "../Components/Forms/IconButton/IconButton";
import NavLink from "../Components/Navigation/NavLink/NavLink";
import MegaMenu from "../Components/Navigation/MegaMenu/MegaMenu";

import Hamburger from "../Components/Forms/Hamburger/Hamburger";
import HamburgerMenu from "../Components/Forms/Hamburger/HamburgerMenu";
import { useState } from "react";
import UserInfo from "../Components/UserInfo/UserInfo";
import { redirect, useNavigate } from "react-router";
import { AiOutlineBell, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Product } from "../Api/Product/Product";
export default function Header() {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 bg-white shadow-lg z-10 ">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center text-primary">
        <section className="flex-1">
          <Hamburger OnClick={() => setHamburgerOpen(true)}></Hamburger>
          <HamburgerMenu
            IsOpen={isHamburgerOpen}
            SetIsOpen={setHamburgerOpen}
          ></HamburgerMenu>
        </section>
        <nav className="flex-1">
          <Link to="/">
            <h1 className="font-bold text-center text-2xl">
              EVERYDAYESSENTIALS
            </h1>
          </Link>
        </nav>
        <section className="hidden md:flex gap-2 items-center justify-end flex-1">
          <SearchInput
            icon={<AiOutlineSearch className="text-2xl"></AiOutlineSearch>}
            placeholder="Search"
            getData={Product.searchProducts}
            onChange={(data) => {
              navigate("/products/" + data.slug);
            }}
          ></SearchInput>
          <IconButton onClick={() => {}}>
            <AiOutlineBell></AiOutlineBell>
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <AiOutlineHeart></AiOutlineHeart>
          </IconButton>

          <Cart></Cart>
          <UserInfo></UserInfo>
        </section>
      </nav>
      <nav className="hidden md:flex justify-center gap-2">
        <ul className="flex space-x-8 font-medium">
          <NavLink to="/" label="HOME" primaryLink></NavLink>
          <NavLink to="#" label="CATEGORIES" primaryLink>
            <MegaMenu></MegaMenu>
          </NavLink>
          <NavLink to="/about" label="ABOUT" primaryLink></NavLink>
        </ul>
      </nav>
    </header>
  );
}
