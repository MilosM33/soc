import IProductListing from "./IProductListing";
import IProductVariant from "./IProductVariant";
import IProductAttribute from "./IProductAttribute";
export default interface IProductPreview {
  id: number;
  title: string;
  description: string;
  slug: string;
  productAttributes: string[];
  variants: IProductVariant[];
  selectedVariant: IProductVariant;
  reviews: string[];
  relatedProducts: IProductListing[];
  attributes: IProductAttribute[];
}
