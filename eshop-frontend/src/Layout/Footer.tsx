import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import NavLink from "../Components/Navigation/NavLink/NavLink";
export default function Footer() {
  return (
    <section className="mt-auto">
      <div className="mt-10 w-full h-1 bg-gray-400"></div>
      <div className="px-4 py-16  mt-auto text-primary">
        <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between md:items-start">
          <article className="my-2 text-center md:text-start md:my-0">
            <h1 className="text-2xl font-bold uppercase">EverydayEssentials</h1>
            <div className="flex text-2xl my-2">
              <a href="https://www.facebook.com" target="_blank">
                <AiFillFacebook></AiFillFacebook>
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <AiFillInstagram></AiFillInstagram>
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <AiFillTwitterCircle></AiFillTwitterCircle>
              </a>
            </div>
          </article>
         
        </div>
        <p className="text-center mt-8">© 2023 Eshop. All rights reserved.</p>
      </div>
    </section>
  );
}
