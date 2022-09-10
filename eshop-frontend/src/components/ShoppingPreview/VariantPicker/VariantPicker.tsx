import React from "react";

export default function VariantPicker(props: any) {
  return (
    <div>
      <h3>Color: Red</h3>
      <div className="flex my-4 space-x-3">
        <div className="rounded-full w-8 h-8 bg-red-400 cursor-pointer relative group">
          <label
            htmlFor=""
            className="bg-slate-800 text-white px-2 py-1 rounded-md absolute -top-10 left-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0 duration-300"
          >
            Red
          </label>
        </div>
        <div className="rounded-full w-8 h-8 bg-blue-400 cursor-pointer relative group">
          <label
            htmlFor=""
            className="bg-slate-800 text-white px-2 py-1 rounded-md absolute -top-10 left-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0 duration-300"
          >
            Blue
          </label>
        </div>
        <div className="rounded-full w-8 h-8 bg-green-400 cursor-pointer relative group">
          <label
            htmlFor=""
            className="bg-slate-800 text-white px-2 py-1 rounded-md absolute -top-10 left-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0 duration-300"
          >
            Green
          </label>
        </div>
      </div>
    </div>
  );
}
