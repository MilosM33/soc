export default interface IProductVariant {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: string[];
  images: string[];
  attributes: string[];
  type: string;
}
