import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import TextInput from "../TextInput/TextInput";
import IconButton from "../IconButton/IconButton";

export interface ValueIncrementProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  min?: number;
  max?: number;
}
export default function ValueIncrement(props: ValueIncrementProps) {
  function increment() {
    let result = props.value + 1;
    if (props.max && result > props.max) {
      result = props.max;
    }
    props.onChange?.(result);
  }
  function decrement() {
    let result = props.value - 1;
    if (props.min && result < props.min) {
      result = props.min;
    }
    props.onChange?.(result);
  }

  function onTextChange(e: any) {
    let result = parseInt(e.target.value);

    if (e.target.value !== "") {
      if (props.min && result < props.min) {
        result = props.min;
      }
      if (props.max && result > props.max) {
        result = props.max;
      }
      props.onChange?.(result);
    }
    
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
