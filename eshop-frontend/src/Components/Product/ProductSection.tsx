import React from "react";
import IProductListing from "./IProductListing";
import ProductListing from "./ProductListing";
import Pagination from "../Pagination/Pagination";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Skeleton from "../Skeleton/Skeleton";

export default function ProductSection({
  isLoading,
  isSuccess,
  isError,
  products,
  page,
  setPage,
  total,
}: {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  products: IProductListing[];
  page: number;
  setPage: (page: number) => void;
  total: number;
}) {
  return (
    <section>
      <section className="container mx-auto relative">
        <div className="sticky top-1/2 left-[90%] w-fit text-white z-10 space-y-4 md:hidden">
          <AiOutlineArrowUp className="text-4xl bg-gray-500 p-2 rounded-full"></AiOutlineArrowUp>
          <AiOutlineArrowDown className="text-4xl bg-gray-500 p-2 rounded-full"></AiOutlineArrowDown>
        </div>
        <div className="my-5 px-2 grid justify-center grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading &&
            Array.from(Array(12).keys()).map((i) => (
              <div>
                <Skeleton className="w-full aspect-square"></Skeleton>

                <section className="flex justify-between items-center">
                  <h3 className="text-primary text-xl">
                    <Skeleton></Skeleton>
                  </h3>

                  <h4 className="text-primary font-medium text-xl">
                    <Skeleton></Skeleton>
                  </h4>
                </section>
                <Skeleton></Skeleton>
              </div>
            ))}

          {isSuccess &&
            products.map((product: IProductListing, _: number) => (
              <ProductListing
                key={(Math.random() % 99999).toString()}
                {...product}
              />
            ))}
        </div>
        {!isLoading && isError && (
          <div className="grid w-full h-96 text-center">
            <div>
              <h1 className="text-3xl text-bol">
                Ops, We didn't find any product that matches your criteria
              </h1>

              <h3 className="text-sm text-gray-500">
                Try to change your search criteria
              </h3>
            </div>
          </div>
        )}
        {isSuccess && (
          <Pagination Total={total} currentPage={page} setPage={setPage} />
        )}
      </section>
    </section>
  );
}
