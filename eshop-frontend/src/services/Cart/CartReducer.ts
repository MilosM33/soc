import { createSlice } from "@reduxjs/toolkit";
import {
  ICartItem,
  IItemVariant,
} from "../../components/ShoppingCart/ShoppingCartItem";
import { IShoppingItem } from "../../components/ShoppingItem/ShoppingItem";
export interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem: IShoppingItem = action.payload;
      const variant = action.payload.variant;
      const cartItems: ICartItem[] = [...state.items];

      let itemIndex: number = cartItems.findIndex(
        (item) =>
          item.item.name === newItem.name &&
          item.variant?.name === variant?.name
      );
      let isInCart: boolean = itemIndex !== -1;
      if (isInCart) {
        cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        cartItems.push({
          item: newItem,
          quantity: action.payload.quantity,
          variant: variant,
        });
      }

      state.items = cartItems;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.item.name !== action.payload
      );
    },
    setQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const cartItems: ICartItem[] = [...state.items];
      const variant = action.payload.variant;
      const itemIndex: number = cartItems.findIndex(
        (item) =>
          item.item.name === itemId && item.variant?.name === variant?.name
      );
      cartItems[itemIndex].quantity = quantity;
      state.items = cartItems;
    },
    clearCart: (state, action) => {},
  },
});

export const { addItem, removeItem, setQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
