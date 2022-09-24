import React from "react";
import { useEffect, useState } from "react";

import { AiFillFilter } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Product } from "../../../services/Api/Product";
import { IShoppingItem, ShoppingItem } from "../../ShoppingItem/ShoppingItem";
import Skeleton from "../../Utils/Skeleton/Skeleton";
import { InView, useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export interface IShoppingItems {
  per_page: number;
  page: number;
  data: IShoppingItem[];
}

export default function ShoppingSection(props: any) {
  const [items, setItems] = useState<IShoppingItems>();

  const wishlistedItems: string[] = useSelector(
    (state: any) => state.wishlist.wishlist
  );

  const { status, data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ["products"],
    async ({ pageParam = 0 }) => {
      const res = await Product.getByPage(pageParam);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) =>
        firstPage.current_page - 1 > 0 ? firstPage.current_page - 1 : undefined,
      getNextPageParam: (lastPage) => lastPage.current_page + 1 ?? undefined,
    }
  );
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      console.log("fetching next page");
      fetchNextPage();
    }
  }, [inView]);
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
          <select name="" id="">
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div
        className="grid mb-10 px-5 grid-cols-1 gap-5 sm:grid-cols-3 md:px-0 lg:grid-cols-4 xl:grid-cols-5"
        ref={ref}
      >
        {isFetching
          ? Array(10)
              .fill(0)
              .map((_, i) => (
                <section>
                  <Skeleton></Skeleton>
                  <Skeleton type="text"></Skeleton>
                </section>
              ))
          : data &&
            data.pages.map((page: any, _: number) =>
              page.data.map((item: IShoppingItem, index: number) => (
                <ShoppingItem
                  key={index * (_ + 1)}
                  {...item}
                  wishlist={wishlistedItems.includes(item.name)}
                />
              ))
            )}
      </div>
      {error != null && (
        <h2 className="text-2xl text-center my-12">
          We didn't find any product which matches your filter.
        </h2>
      )}

      <div ref={ref} className="w-full h-20 "></div>
    </div>
  );
}
