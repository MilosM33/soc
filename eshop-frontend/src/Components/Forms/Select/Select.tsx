import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export interface SelectProps {
  options: string[];
  selected?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  error?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  maxHeight?: string;
}
export default function Select(props: SelectProps) {
  const [state, setState] = useState({
    isOpen: false,
  });

  function onOptionChange(value: number) {
    if (props.disabled) return;

    props.onChange?.({
      target: {
        value: props.options[value],
        id: props.id,
      },
    });
    setState({ isOpen: false });
  }

  function showOptions() {
    if (props.disabled) return;
    setState({ ...state, isOpen: !state.isOpen });
  }

  return (
    <div>
      <div
        className={
          "rounded-lg text-gray-500 bg-gray-100 group border-2 border-gray-100 focus-within:border-red-400 transition-colors duration-200 relative group"
        }
      >
        <div
          className="flex px-2 py-2 items-center space-x-2"
          onClick={showOptions}
          onBlur={props.onBlur}
        >
          <input
            type="text"
            className="outline-none bg-gray-100 w-full"
            value={props.selected || props.placeholder || props.options[0]}
            readOnly
            id={props.id}
            onBlur={props.onBlur}
          />
        </div>
        <section
          className={`absolute mx-0 top-[105%] left-0 z-10 w-full overflow-hidden ${
            state.isOpen ? "max-h-max" : "max-h-0"
          }`}
        >
          <ul
            className="bg-white shadow-lg w-full rounded-lg text-left border-2 border-t-0 border-red-400 overflow-auto"
            style={{
              maxHeight: "200px",
            }}
          >
            {props.options.map((option: string, _: number) => (
              <li
                className="px-4 py-2 hover:bg-red-400 hover:text-white"
                onClick={() => onOptionChange(_)}
              >
                {option}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="text-red-400 my-1">{props.error}</div>
    </div>
  );
}
