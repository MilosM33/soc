import { createSlice } from "@reduxjs/toolkit";
import { IShoppingItem } from "../ShoppingItem/ShoppingItem";

export interface IProductState {
  product: IShoppingItem | null;
  quantity: number;
  loading: boolean;
  swiper: any;
  attributes: any[];
  images: any[];
  variants: any[];
  currentVariant: any;
  reviews: any[];
}

let initialState: IProductState = {
  product: null,
  quantity: 1,
  loading: true,
  swiper: null,
  attributes: [],
  images: [],
  variants: [],
  currentVariant: null,
  reviews: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state: IProductState, action: any) => {
      const productState: IProductState = action.payload as IProductState;
      state = { ...state, ...productState };
      // downcasting
      state.product = { ...action.payload };

      //
      state.currentVariant = state.variants[0];
      state.loading = false;
      return state;
    },
    setNumberOfItems: (state: IProductState, action: any) => {
      state.quantity = action.payload;
      return state;
    },
    setImages: (state: IProductState, action: any) => {
      state.images = action.payload;
      return state;
    },
    changeSlide: (state: IProductState, action: any) => {
      if (action.payload === "next") {
        state.swiper.slideNext();
      } else {
        state.swiper.slidePrev();
      }
      return state;
    },
    setAttributes: (state: IProductState, action: any) => {
      state.attributes = action.payload;
      return state;
    },
    setState: (state: IProductState, action: any) => {
      state.loading = action.payload;
      return state;
    },
    setVariant: (state: IProductState, action: any) => {
      state.currentVariant = action.payload;
      state.images = action.payload.images;
      return state;
    },
  },
});

export const {
  setProduct,
  setNumberOfItems,
  changeSlide,
  setAttributes,
  setState,
  setImages,
  setVariant,
} = productSlice.actions;
export default productSlice.reducer;
