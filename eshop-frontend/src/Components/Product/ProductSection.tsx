import React from "react";
import IProductListing from "./IProductListing";
import ProductListing from "./ProductListing";
import { useState, useEffect } from "react";

import { Product } from "../../Api/Product/Product";
export default function ProductSection() {
  const [products, setProducts] = useState<IProductListing[]>([]);
  useEffect(() => {
    Product.getProducts().then((response) => {
      setProducts(response.data["data"]);
    });
  }, [products]);
  return (
    <div className="my-5 grid justify-center grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductListing {...product} />
      ))}
    </div>
  );
}
