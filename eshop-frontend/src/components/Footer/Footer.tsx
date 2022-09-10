import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import InputText from "../Utils/InputText/InputText";
import FooterItem from "./FooterItem";

export default function Footer() {
  const routes = [
    {
      title: "Company",
      subroutes: [
        {
          title: "About",
          route: "/about",
        },
        {
          title: "Contact",
          route: "/contact",
        },
        {
          title: "Careers",
          route: "/careers",
        },
        {
          Privacy: "Privacy",
          route: "/privacy",
        },
      ],
    },
    {
      title: "Help",
      subroutes: [
        {
          title: "Order Tracking",
          route: "/order-tracking",
        },
        {
          title: "Terms & Conditions",
          route: "/terms-and-conditions",
        },
      ],
    },
  ];
  return (
    <div className="bg-gray-700 text-white w-full mt-auto">
      <div className="container mx-auto flex flex-col px-4 md:flex-row md:px-0 mb-4 py-4">
        {routes.map((route) => {
          return <FooterItem key={route.title} {...route} />;
        })}

        <section className="flex-1 space-y-4">
          <h1 className="text-xl my-4">Newsletter</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora et
            modi sit optio cumque totam vero quo consequuntur iste excepturi?
          </p>
          <div className="flex space-x-4">
            <InputText
              label="Email"
              inputClasses="text-white bg-slate-800 px-2"
            ></InputText>
            <button>Sign up</button>
          </div>
        </section>
      </div>
      <hr />
      <div className="container mx-auto text-center flex justify-between px-4 py-4 md:px-0 sm:text-left">
        <a href="">Terms & Conditions</a>
        <div className="flex items-center space-x-2">
          <FaFacebookF className="cursor-pointer"></FaFacebookF>
          <FaInstagram className="cursor-pointer"></FaInstagram>
        </div>
        <div>Currency: USD</div>
        <div>Localization: US</div>
      </div>
    </div>
  );
}
