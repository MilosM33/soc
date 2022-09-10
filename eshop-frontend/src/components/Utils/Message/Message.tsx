import React from "react";

type MessageProps = {
  message: string;
};
export default function Message(props: MessageProps) {
  return (
    <div className="px-4 py-2 bg-red-400 text-white text-center">
      {props.message
        ? props.message
        : "Doprava zadarmo pri objednávke od 100 Kč"}
    </div>
  );
}
