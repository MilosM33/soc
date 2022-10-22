import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import TextInput from "../TextInput/TextInput";
import IconButton from "../IconButton/IconButton";

export interface ValueIncrementProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
}
export default function ValueIncrement(props: ValueIncrementProps) {
  function increment() {
    props.onChange?.(props.value + 1);
  }
  function decrement() {
    props.onChange?.(props.value - 1);
  }
  function onTextChange(value: string) {
    props.onChange?.(parseInt(value));
  }
  return (
    <div className={"flex items-center space-x-2 " + props.className}>
      <IconButton onClick={decrement}>
        <AiOutlineMinus />
      </IconButton>
      <TextInput
        placeholder="Quantity"
        value={props.value.toString()}
        className="w-8 text-center"
        onChange={onTextChange}
      ></TextInput>
      <IconButton onClick={increment}>
        <AiOutlinePlus />
      </IconButton>
    </div>
  );
}
