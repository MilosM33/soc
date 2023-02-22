import IProductReview from "./IProductReview";
import IProductAttribute from "./IProductAttribute";
export default interface IProductVariant {
  id: number;
  name: string;
  price: number;
  rating: number;
  images: string[];
  attributes: IProductAttribute[];
  type: string;
  reviews: IProductReview[];
}
