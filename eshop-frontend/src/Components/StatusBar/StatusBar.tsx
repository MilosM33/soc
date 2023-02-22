import React from "react";
import { useState } from "react";
import Step, { IStepProps } from "./Step";

export interface IStatusBarProps {
  steps: IStepProps[];
  step: number;
  className?: string;

  onStepChange?: (step: number) => void;
}

export default function StatusBar(props: IStatusBarProps) {
  function onClicked(value: number) {
    props.onStepChange?.(value);
  }

  return (
    <section className={"mx-auto flex justify-between relative " + props.className}>
      {props.steps.map((item: IStepProps, _: number) => (
        <Step {...item} onClicked={onClicked}></Step>
      ))}

      <div className="absolute w-full h-1 bg-gray-300 top-1/2 -translate-y-1/2 -z-10"></div>
      <div
        className="absolute h-1 bg-red-400 top-1/2 -translate-y-1/2 -z-10 transition-width duration-200"
        style={{
          width: `${(props.step / (props.steps.length - 1)) * 100}%`,
        }}
      ></div>
    </section>
  );
}
