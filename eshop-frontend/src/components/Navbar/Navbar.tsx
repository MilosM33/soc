import Link from "../Link/Link";
import Hamburger from "./Hamburger/Hamburger";
import Belt from "./Belt/Belt";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import SearchComponent from "../SearchComponent/SearchComponent";
import React from "react";
import { useSelector } from "react-redux";
import Login from "../Auth/Login";
export default function Navbar() {
  const user = useSelector((state: any) => state.user);
  const navRoutes = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Shop",
      route: "/store",
    },
    {
      name: "About",
      route: "/about",
    },
    {
      name: "Contact",
      route: "/contact",
    },
  ];
  return (
    <nav className="sticky top-0 left-0 flex flex-col md:flex-row justify-between items-center px-4 py-3 text-lg font-normal z-20 bg-white">
      <div className="flex justify-between w-full md:w-auto items-center gap-5">
        <Hamburger></Hamburger>
        <SearchComponent></SearchComponent>
      </div>
      <ul className="flex">
        {navRoutes.map((route) => {
          return (
            <Link key={route.route} to={route.route} className="px-4">
              {route.name}
            </Link>
          );
        })}
      </ul>
      <ul className="flex items-center space-x-3 text-slate-800">
        <li>{user.loggedIn ? <h1>Vitaj {user.name}</h1> : <Login></Login>}</li>
        <li>
          <Belt></Belt>
        </li>
        <li>
          <ShoppingCart></ShoppingCart>
        </li>
      </ul>
    </nav>
  );
}
