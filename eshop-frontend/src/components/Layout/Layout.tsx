import React from "react";
import Message from "../Utils/Message/Message";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
export default function Layout(props: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="fixed z-50"
      />
      <div className="container mx-auto">
        <Message message=""></Message>
        <Navbar />
        {props.children}
      </div>
      <Footer></Footer>
    </div>
  );
}
