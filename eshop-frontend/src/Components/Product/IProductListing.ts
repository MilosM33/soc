export default interface IProductListing {
  id: number;
  key?: string;
  title: string;
  description: string;
  slug: string;
  tags?: string[];
  variants: IProductListingVariant[];
  selectedVariant: IProductListingVariant;
}

export interface IProductListingVariant {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}
