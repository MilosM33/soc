import React from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "../Forms/Button/Button";
import TextInput from "../Forms/TextInput/TextInput";

export default function Cart() {
  return (
    <div className="fixed z-20 top-0 right-0 w-full h-screen md:w-1/2 lg:w-1/4  bg-white">
      <section className="p-8 flex flex-col h-full">
        <div className="flex mb-8 justify-between items-center">
          <h1 className="text-2xl ">Cart</h1>
          <AiOutlineClose></AiOutlineClose>
        </div>
        <section className="flex flex-col flex-1 space-y-4  overflow-auto">
          <article className="flex items-start">
            <img
              src="https://via.placeholder.com/150"
              className="w-24 object-contain"
              alt=""
            />

            <section className="flex-1 px-4">
              <div className="flex justify-between">
                <h1>Basic micro rib thurtleneck</h1>
                <AiOutlineClose></AiOutlineClose>
              </div>
              <p>Variant</p>
              <p>Price</p>
              <section className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <AiOutlineMinus className="text-2xl" />
                  <TextInput
                    placeholder="Quantity"
                    value="1"
                    className="w-8 text-center"
                  ></TextInput>
                  <AiOutlinePlus className="text-2xl" />
                </div>

                <p>$79.00</p>
              </section>
            </section>
          </article>
          <article className="flex items-start">
            <img
              src="https://via.placeholder.com/150"
              className="w-24 object-contain"
              alt=""
            />

            <section className="flex-1 px-4">
              <div className="flex justify-between">
                <h1>Basic micro rib thurtleneck</h1>
                <AiOutlineClose></AiOutlineClose>
              </div>
              <p>Variant</p>
              <p>Price</p>
              <section className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <AiOutlineMinus className="text-2xl" />
                  <TextInput
                    placeholder="Quantity"
                    value="1"
                    className="w-8 text-center"
                  ></TextInput>
                  <AiOutlinePlus className="text-2xl" />
                </div>

                <p>$79.00</p>
              </section>
            </section>
          </article>
          <article className="flex items-start">
            <img
              src="https://via.placeholder.com/150"
              className="w-24 object-contain"
              alt=""
            />

            <section className="flex-1 px-4">
              <div className="flex justify-between">
                <h1>Basic micro rib thurtleneck</h1>
                <AiOutlineClose></AiOutlineClose>
              </div>
              <p>Variant</p>
              <p>Price</p>
              <section className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <AiOutlineMinus className="text-2xl" />
                  <TextInput
                    placeholder="Quantity"
                    value="1"
                    className="w-8 text-center"
                  ></TextInput>
                  <AiOutlinePlus className="text-2xl" />
                </div>

                <p>$79.00</p>
              </section>
            </section>
          </article>
          <article className="flex items-start">
            <img
              src="https://via.placeholder.com/150"
              className="w-24 object-contain"
              alt=""
            />

            <section className="flex-1 px-4">
              <div className="flex justify-between">
                <h1>Basic micro rib thurtleneck</h1>
                <AiOutlineClose></AiOutlineClose>
              </div>
              <p>Variant</p>
              <p>Price</p>
              <section className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <AiOutlineMinus className="text-2xl" />
                  <TextInput
                    placeholder="Quantity"
                    value="1"
                    className="w-8 text-center"
                  ></TextInput>
                  <AiOutlinePlus className="text-2xl" />
                </div>

                <p>$79.00</p>
              </section>
            </section>
          </article>
          <article className="flex items-start">
            <img
              src="https://via.placeholder.com/150"
              className="w-24 object-contain"
              alt=""
            />

            <section className="flex-1 px-4">
              <div className="flex justify-between">
                <h1>Basic micro rib thurtleneck</h1>
                <AiOutlineClose></AiOutlineClose>
              </div>
              <p>Variant</p>
              <p>Price</p>
              <section className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <AiOutlineMinus className="text-2xl" />
                  <TextInput
                    placeholder="Quantity"
                    value="1"
                    className="w-8 text-center"
                  ></TextInput>
                  <AiOutlinePlus className="text-2xl" />
                </div>

                <p>$79.00</p>
              </section>
            </section>
          </article>
          <article className="flex items-start">
            <img
              src="https://via.placeholder.com/150"
              className="w-24 object-contain"
              alt=""
            />

            <section className="flex-1 px-4">
              <div className="flex justify-between">
                <h1>Basic micro rib thurtleneck</h1>
                <AiOutlineClose></AiOutlineClose>
              </div>
              <p>Variant</p>
              <p>Price</p>
              <section className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <AiOutlineMinus className="text-2xl" />
                  <TextInput
                    placeholder="Quantity"
                    value="1"
                    className="w-8 text-center"
                  ></TextInput>
                  <AiOutlinePlus className="text-2xl" />
                </div>

                <p>$79.00</p>
              </section>
            </section>
          </article>
        </section>
        <footer className="mt-auto h-fit pt-4">
          <hr />
          <h1 className="text-xl pt-4">
            Total: <span className="text-primary">$ 0.00</span>
          </h1>
          <h2 className="text-lg text-gray-400 font-light">
            Shipping: <span>$ 0.00</span>
          </h2>

          <Button className="w-full">Checkout</Button>
          <Button className="w-full" variant="secondary">
            Continue shopping
          </Button>
        </footer>
      </section>
    </div>
  );
}
