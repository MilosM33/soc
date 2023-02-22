import { AxiosResponse } from "axios";
import React from "react";
import debounce from "../../../Api/Utils/Debounce";
import { useState } from "react";

export interface ISearchInputProps {
  icon?: React.ReactNode;
  placeholder?: string;
  getData: (query: string) => Promise<AxiosResponse<any, any>>;
  onChange?: (data: any) => void;
  value?: string;
  titleProperty?: string;
  maxHeight?: number;
}

export default function SearchInput({
  icon,
  placeholder,
  getData,
  onChange,
  value,
  titleProperty = "title",
  maxHeight = 250,
}: ISearchInputProps) {
  const [options, setOptions] = useState<any>([]);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [text, setText] = useState<string>(value || "");

  function searchTerm(e: any) {
    setText(e.target.value);
    const apiCall = debounce(() => {
      getData(e.target.value).then((res) => {
        setOptions(res.data);
      });
    }, 500);

    apiCall();
  }

  return (
    <div className="rounded-lg text-gray-500 bg-gray-100 group border-2 border-gray-100 focus-within:border-red-400 transition-colors duration-200 relative group">
      <div className="flex px-2 py-2 items-center space-x-2">
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none bg-gray-100 "
          onChange={searchTerm}
          value={text}
          onFocus={() => setIsFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setIsFocused(false);
            }, 350)
          }
        />
      </div>

      <section
        className={
          "absolute mx-0 top-[105%] left-0 z-10 w-full overflow-hidden " +
          (isFocused ? " block" : " hidden ")
        }
      >
        <ul
          className={
            "bg-white shadow-lg w-full rounded-lg text-left border-2 border-t-0 overflow-auto " +
            (options && options.length > 0 ? "border-red-400" : "")
          }
          style={{ maxHeight: maxHeight }}
        >
          {options &&
            options.map((option: any) => (
              <li
                className="px-4 py-2 hover:bg-red-400 hover:text-white"
                onClick={(e: any) => {
                  setText(option[titleProperty]);
                  onChange?.(option);
                }}
              >
                {option[titleProperty]}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
