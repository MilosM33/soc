import React from "react";

export default function Footer() {
  return (
    <div className="px-4 py-8  mt-auto bg-primary text-white">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between md:items-start">
        <article className="my-2 text-center md:text-start md:my-0">
          <h1 className="text-xl font-medium">eShop</h1>
          <p className="mt-2 text-gray-400 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod.
          </p>
        </article>
        <section className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-start">
          <article>
            <h1 className="text-xl font-medium my-2">Products</h1>
            <ul className="space-y-2">
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
            </ul>
          </article>
          <article>
            <h1 className="text-xl font-medium my-2">Help</h1>
            <ul className="space-y-2">
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
            </ul>
          </article>
          <article>
            <h1 className="text-xl font-medium my-2">About</h1>
            <ul className="space-y-2">
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
              <li>
                <a href="" className="text-gray-400">
                  Lorem ipsum dolor sit amet.
                </a>
              </li>
            </ul>
          </article>
        </section>
      </div>
      <p className="text-center mt-8">© 2021 Eshop. All rights reserved.</p>
    </div>
  );
}
