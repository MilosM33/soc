import React from "react";

export interface ITooltipProps {
  text: string;
  hint: string;
}

export default function Tooltip(props: ITooltipProps) {
  return (
    <p className="relative group">
      {props.text}
      <p className="absolute top-full left-1/2 -translate-x-1/2 group-hover:block hidden bg-slate-800 text-white px-2 py-1">
        {props.hint}
      </p>
    </p>
  );
}
