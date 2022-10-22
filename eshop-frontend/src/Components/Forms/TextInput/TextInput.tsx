import React from "react";

export interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: "text" | "password" | "email";
}

export default function TextInput({
  placeholder,
  value,
  onChange,
  className,
  type,
}: TextInputProps) {
  return (
    <div className="flex px-2 py-2 items-center space-x-2 rounded-lg text-gray-500 bg-gray-100 group border-2 border-gray-100 focus-within:border-red-400 transition-colors duration-200">
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        className={"outline-none bg-gray-100 " + className}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
