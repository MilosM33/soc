export interface ICartItem {
  id: number;
  title: string;
  slug: string;
  quantity: number;
  variants?: ICartItemVariant[];
  selectedVariant: ICartItemVariant;
}

export interface ICartItemVariant {
  id: number;
  name: string;
  price: number;
  image: string;
}
