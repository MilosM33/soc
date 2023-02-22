import React from "react";

export default function PopUnder({
  children,
  className,
  IsOpen,
  SetIsOpen,
}: {
  children: React.ReactNode;
  className: string;
  IsOpen: boolean;
  SetIsOpen: any;
}) {
  if (!IsOpen) return null;

  return (
    <section className={"absolute px-4 py-2 bg-white rounded-sm z-20 " + className}>
      {children}
    </section>
  );
}
