import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "../../Api/Product/Product";
import IProductPreview from "../Product/IProductPreview";
import ProductListing from "../Product/ProductListing";

export default function RelatedProducts() {
  const params = useParams();
  const [products, setProducts] = useState<IProductPreview[]>([]);

  useEffect(() => {
    if (params.slug) {
      Product.getRelatedProducts(params.slug).then((response) => {
        setProducts(response.data);
      });
    }
  }, [params.slug]);

  return (
    <section className="mt-64">
      <h1 className="text-2xl text-primary uppercase my-3">Related products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
        {products.map((product) => (
          <ProductListing {...product}></ProductListing>
        ))}
      </div>
    </section>
  );
}
