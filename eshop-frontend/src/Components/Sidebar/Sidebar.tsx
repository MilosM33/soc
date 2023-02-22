import React from "react";
import { useState } from "react";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={
        "fixed top-0 w-full h-full bg-white z-50 transition-all duration-500 ease-in-out " +
        (isOpen ? "left-0" : "-left-full")
      }
    >
      <section className="flex w-full h-full">
        <div className="p-4 flex flex-col bg-gray-200 h-full">
          <div
            className="space-y-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-7 h-1 bg-primary rounded-full"></div>
            <div className="w-7 h-1 bg-primary rounded-full"></div>
            <div className="w-7 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="flex-1"></div>
      </section>
    </div>
  );
}
