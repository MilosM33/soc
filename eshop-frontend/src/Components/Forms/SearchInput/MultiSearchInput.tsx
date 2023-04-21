import { AxiosResponse } from "axios";
import React from "react";
import debounce from "../../../Api/Utils/Debounce";
import { useState } from "react";
import { ISearchInputProps } from "./SearchInput";
import IconButton from "../IconButton/IconButton";
import { AiOutlineClose } from "react-icons/ai";

export interface IMultiSearchInput {
  selected: any[];
  setSelected: (selected: any[]) => void;
  icon?: JSX.Element;
  placeholder?: string;
  getData: (search: string) => Promise<AxiosResponse<any>>;
  onChange?: (selected: any) => void;
  value?: string;
  titleProperty?: string;
  maxHeight?: number;
}

export default function MultiSearchInput({
  icon,
  placeholder,
  getData,
  onChange,
  value,
  titleProperty = "title",
  maxHeight = 250,
  selected,
  setSelected,
}: IMultiSearchInput) {
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
    <section>
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
                    console.log(selected);

                    setSelected([...selected, option]);
                    onChange?.(option);

                    setText(
                      titleProperty
                        .split(".")
                        .reduce((prev: any, curr: any) => {
                          return prev[curr];
                        }, option)
                    );
                  }}
                >
                  {titleProperty.split(".").reduce((prev: any, curr: any) => {
                    return prev[curr];
                  }, option)}
                </li>
              ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
