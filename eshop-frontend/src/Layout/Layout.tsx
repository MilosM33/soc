import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { ScrollRestoration } from "react-router-dom";
export default function Layout(props: any) {
  return (
    <div className="App min-h-screen relative flex flex-col">
      <div className="px-4 py-2 bg-red-400 text-primary text-center text-lg">
        Doprava zadarmo pri objednávke od 100 Kč
      </div>

      <Header></Header>
      <section className={"px-4 mt-[32px] " + props.className}>
        {props.children}
      </section>
      <ScrollRestoration></ScrollRestoration>
      <Footer></Footer>
    </div>
  );
}
