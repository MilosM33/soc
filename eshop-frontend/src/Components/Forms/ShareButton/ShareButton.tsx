import React from "react";
import { AiOutlineShareAlt, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="cursor-pointer relative select-none">
      <AiOutlineShareAlt className="text-3xl" onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="absolute top-1/2 left-full bg-white rounded-md shadow-md p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-xl my-2">Share this product</h3>
              <AiOutlineClose
                className="text-2xl"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full px-2 py-1">
                Facebook
              </div>
              <div className="bg-blue-500 text-white rounded-full px-2 py-1">
                Twitter
              </div>
              <div className="bg-gradient-to-r from-pink-500 via-pink-500 to-yellow-400 text-white rounded-full px-2 py-1">
                Instagram
              </div>
              <div className="bg-slate-400 text-white rounded-full px-2 py-1">
                URL
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}