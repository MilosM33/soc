import { Product } from "../../Api/Product/Product";
import { IProductListingPage } from "../Product/IProductListing";
import ProductSection from "../Product/ProductSection";

export default function DailySale() {
  function fetchPage(page: number = 1): Promise<IProductListingPage> {
    return Product.getProductsByPage(page).then((res) => {
      return res.data.products;
    });
  }

  return (
    <>
      <section className="bg-secondary mb-20">
        <section className="container mx-auto py-20 px-4 text-center md:text-left md:px-0  ">
          <h1 className="text-2xl uppercase font-bold">
            Don't miss out on our daily deals!
          </h1>
          <h3 className="text-xl uppercase my-2">
            Save on top-selling products today only!
          </h3>
          <h1 className="text-2xl text-white uppercase my-10 font-bold md:text-5xl">
            You still have 01 H : 20 M: 30S !
          </h1>
        </section>
      </section>
      {/*  <ProductSection fetchPage={fetchPage}></ProductSection> */}
    </>
  );
}
