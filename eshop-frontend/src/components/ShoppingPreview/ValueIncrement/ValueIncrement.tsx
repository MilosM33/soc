import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
export interface ValueInterface {
  value: number;
  onChange?: (value: number) => void;
}

export default function ValueIncrement(props: ValueInterface) {
  function handleChange(value: number) {
    if (value > 0) {
      props.onChange?.(value);
    } else return 1;
  }
  function handleInput(e: any) {
    const value = e.target.value;
    if (value > 0) {
      props.onChange?.(parseInt(value));
    } else return 1;
  }
  return (
    <div className="flex items-center">
      <AiOutlineMinus
        onClick={() => handleChange(props.value - 1)}
        className="cursor-pointer"
      ></AiOutlineMinus>
      <input
        type="text"
        name=""
        id=""
        className="w-8 outline-none text-center"
        value={props.value}
        onChange={handleInput}
      />
      <AiOutlinePlus
        onClick={() => handleChange(props.value + 1)}
        className="cursor-pointer"
      ></AiOutlinePlus>
    </div>
  );
}
