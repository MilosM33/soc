import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
export default function SearchInput(props: any) {
  return (
    <div className="rounded-lg text-gray-500 bg-gray-100 group border-2 border-gray-100 focus-within:border-red-400 transition-colors duration-200 relative group">
      <div className="flex px-2 py-2 items-center space-x-2">
        <AiOutlineSearch className="text-2xl"></AiOutlineSearch>
        <input
          type="text"
          placeholder="Search"
          className="outline-none bg-gray-100 "
        />
      </div>

      <section className="absolute mx-0 top-[105%] left-0 z-10 w-full hidden group-focus-within:block">
        <ul className="bg-white shadow-lg w-full rounded-lg">
          <li className="px-4 py-2 hover:bg-red-400 hover:text-white">Test</li>
          <li className="px-4 py-2 hover:bg-red-400 hover:text-white">Test</li>
          <li className="px-4 py-2 hover:bg-red-400 hover:text-white">Test</li>
          <li className="px-4 py-2 hover:bg-red-400 hover:text-white">Test</li>
          <li className="px-4 py-2 hover:bg-red-400 hover:text-white">Test</li>
        </ul>
      </section>
    </div>
  );
}
