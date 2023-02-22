import React from "react";

export interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  className?: string;
  type?: "text" | "password" | "email";
  fullWidth?: boolean;
  error?: string;
  id?: string;
  onBlur?: (e: any) => void;
  disabled?: boolean;
}

export default function TextInput({
  placeholder,
  value,
  onChange,
  className,
  type,
  fullWidth,
  error,
  id,
  onBlur,
  disabled,
}: TextInputProps) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      <div
        className={
          "flex px-2 py-2 items-center space-x-2 rounded-lg text-gray-500 bg-gray-100 group border-2 border-gray-100 focus-within:border-red-400 transition-colors duration-200  " +
          (fullWidth ? "w-full" : "")
        }
      >
        <input
          type={type ?? "text"}
          placeholder={placeholder}
          className={"outline-none bg-gray-100 w-full " + className}
          value={value}
          onChange={(e) => onChange?.(e)}
          id={id}
          onBlur={(e) => onBlur?.(e)}
          disabled={disabled}
        />
      </div>
      <div className="text-red-400 my-1">{error}</div>
    </div>
  );
}
