import React from "react";
import { Link } from "react-router-dom";

export interface IStepProps {
  children: React.ReactNode;
  step: number;
  onClicked?: (step: number) => void;
  canClick?: () => boolean;
  completed?: boolean;
  to?: string;
  label?: string;
}

export default function Step(props: IStepProps) {
  function onClick(e: any) {
    if (!props.canClick?.()) return;

    props.onClicked?.(props.step);
  }
  return (
    <div className="relative">
      <button
        className={`px-4 py-2 my-2 rounded-lg transition-all duration-200 w-fit ${
          props.completed
            ? "bg-red-400 text-white"
            : "bg-gray-200 text-gray-500"
        } ${props.canClick?.() ? "cursor-pointer" : "cursor-not-allowed"}`}
        style={{
          transitionDelay: `${(props.step + 1) * 100}ms`,
        }}
        onClick={onClick}
      >
        {props.children}
      </button>
      <label htmlFor="" className={"absolute top-full -translate-x-1/2 left-1/2 w-32 text-center " + (props.completed ? " text-red-400 " : "")}>{props.label}</label>
    </div>
  );
}
