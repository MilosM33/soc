import React from "react";

export interface IInputTextProps {
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: any) => void;
  hide?: boolean;
  inputClasses?: string;
  labelClasses?: string;
}

export default function InputText(props: IInputTextProps) {
  return (
    <div>
      <div className={"w-full relative my-2 group"}>
        <input
          type={props.hide ? "password" : "text"}
          name={props.name}
          id=""
          className={
            "w-full outline-none py-2 border-b-2 border-slate-300 peer " +
            props.inputClasses
          }
          required
          value={props.value}
          onChange={props.onChange}
        />
        <label
          htmlFor=""
          className={
            "absolute  bottom-0 peer-focus:bottom-8 left-0 duration-200 text-slate-400 peer-valid:bottom-8 pointer-events-none " +
            props.labelClasses
          }
        >
          {props.label}
        </label>
      </div>
    </div>
  );
}
