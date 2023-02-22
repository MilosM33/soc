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
  images: string[];
  rating: number;
}

export interface IProductListingPage {
  data: IProductListing[];
  meta: {
    current_page: number;
    total: number;
    last_page: number;
  };
}
