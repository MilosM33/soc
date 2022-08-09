import React from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import Button from "../components/Button/Button";
import ColorPicker from "../components/VariantPicker/VariantPicker";
import Layout from "../components/Layout/Layout";
import Rating from "../components/Rating/Rating";
import ValueIncrement from "../components/ValueIncrement/ValueIncrement";
import VariantPicker from "../components/VariantPicker/VariantPicker";
import Review from "../components/Review/Review";

export default function ProductPreview(props: any) {
  return (
    <Layout>
      <section className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
        <section className="flex-1 order-2 lg:order-1 box-border px-4 w-full">
          <h1 className="my-8 text-3xl md:text-5xl text-slate-800">
            Product name
          </h1>
          <Rating value={3} className="my-5"></Rating>
          <p className="lg:w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            voluptatum ut similique quia qui labore quisquam provident inventore
            fugit numquam ipsam repellendus distinctio ipsa, mollitia molestias
            dolore unde velit nobis.
          </p>

          <VariantPicker></VariantPicker>
          <div className="flex items-center space-x-4 mt-8">
            <ValueIncrement value={0}></ValueIncrement>
            <Button type={"primary"} className="w-64">
              Add to cart
            </Button>
            <AiOutlineShareAlt className="text-3xl" />
          </div>
        </section>
        <section className="flex-1 order-1 lg:order-2">
          <img src={require("./placeholder.png")} alt="" />
        </section>
      </section>

      <div className="px-4 mt-16">
        <h2 className="text-2xl my-8">Reviews for this product ( 80 ) </h2>
        <button> Add review</button>
        <div
          className="flex flex-col gap-9 md:w-3/4 lg:w-1/2
         mx-auto"
        >
          <Review></Review>
          <Review></Review>
          <Review></Review>
          <Review></Review>
        </div>

        <div>
          <h2 className="text-2xl my-8">Related products</h2>
        </div>
      </div>
    </Layout>
  );
}
