import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import { AiFillFilter } from "react-icons/ai";
import { IShoppingItem, ShoppingItem } from "../ShoppingItem/ShoppingItem";

export interface IShoppingItems {
  per_page: number;
  page: number;
  data: IShoppingItem[];
}

export default function ShoppingSection(props: any) {
  const [items, setItems] = useState<IShoppingItems>();

  function orderItems(e: any) {
    const value = e.target.value;
    if (items?.data === undefined) return;

    let itemsData = [...items.data];
    if (value === "name") {
      itemsData = itemsData.sort((a: any, b: any) =>
        a.name > b.name ? 1 : -1
      );
    } else if (value === "price") {
      itemsData = itemsData.sort((a: any, b: any) =>
        a.price > b.price ? 1 : -1
      );
    }

    setItems({ ...items, data: itemsData });
  }
  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((res) => {
      setItems(res.data);
    });
  }, []);
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl my-4">Shop</h1>
        <ul className="flex justify-center space-x-2">
          <li>Computers</li>
          <li>Computers</li>
          <li>Computers</li>
          <li>Computers</li>
        </ul>
      </div>
      <div className="flex justify-between my-4">
        <small className="text-gray-400">Home / Shop</small>
        <div className="flex space-x-4">
          <div>
            <AiFillFilter className="inline" />
            Filters
          </div>
          <select name="" id="" onInput={orderItems}>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="grid mb-10 px-5 grid-cols-1 gap-5 sm:grid-cols-3 md:px-0 lg:grid-cols-4 xl:grid-cols-5">
        {items &&
          items.data.map((item: IShoppingItem) => (
            <ShoppingItem key={item.id} {...item} />
          ))}
      </div>
      {items == null && (
        <h2 className="text-2xl text-center my-12">
          We didn't find any product which matches your filter.
        </h2>
      )}
    </div>
  );
}
