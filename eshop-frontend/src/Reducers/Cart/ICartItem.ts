export interface ICartItem {
  id: number;
  title: string;
  url: string;
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
