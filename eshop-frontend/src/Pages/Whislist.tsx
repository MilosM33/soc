import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductListing from "../Components/Product/ProductListing";
import Layout from "../Layout/Layout";

export default function Whislist() {
  const whislist = useSelector((state: any) => state.wishlist);
  
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl mb-2">Wishlist</h1>
        <div className="grid justify-center grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {whislist.map((product: any) => (
            <ProductListing {...product}></ProductListing>
          ))}
        </div>
      </div>
    </Layout>
  );
}
