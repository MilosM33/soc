import React from "react";
import { BsSearch } from "react-icons/bs";
export default function SearchComponent() {
  return (
    <div className="flex relative justify-center items-center shadow-2xl rounded-xl p-4 hover:space-x-4 group duration-300 cursor-pointer">
      <BsSearch></BsSearch>
      <input
        type="text"
        name=""
        id=""
        className="border-b-2 outline-none duration-300 w-0 group-hover:w-56"
        placeholder="Type something.."
      />
    </div>
  );
}
