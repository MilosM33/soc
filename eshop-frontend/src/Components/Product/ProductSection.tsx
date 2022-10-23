import React from "react";
import IProductListing from "./IProductListing";
import ProductListing from "./ProductListing";

export default function ProductSection() {
  const products: IProductListing[] = [
    {
      id: 1,
      url: "product-1",
      key: "1",
      tags: ["New", "Sale"],
      title: "Product 1",
      description: "Product 1 description",
      selectedVariant: {
        id: 1,
        name: "Variant 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        rating: 4,
      },
    },
    {
      id: 2,
      url: "product-2",
      key: "2",
      tags: ["New", "Sale"],
      title: "Product 2",
      description: "Product 2 description",
      variants: [
        {
          id: 1,
          name: "Variant 1",
          price: 100,
          image: "https://picsum.photos/200/300",
          rating: 1,
        },
        {
          id: 2,
          name: "Variant 2",
          price: 250,
          image: "https://picsum.photos/200/300",
          rating: 4,
        },
      ],
      selectedVariant: {
        id: 1,
        name: "Variant 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        rating: 1,
      },
    },
  ];

  return (
    <div className="my-5 grid justify-center grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductListing {...product} />
      ))}
    </div>
  );
}
