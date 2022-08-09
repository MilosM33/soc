import React from "react";
import Layout from "../components/Layout/Layout";
import Carousel from "../components/Carousel/Carousel";
import ShoppingSection from "../components/ShoppingSection/ShoppingSection";
export default function MainPage() {
  return (
    <Layout>
      <Carousel></Carousel>
      <ShoppingSection></ShoppingSection>
    </Layout>
  );
}
