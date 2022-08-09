import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../../components/ShoppingCart/ShoppingCartItem";
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

      const cartItems: ICartItem[] = [...state.items];

      let itemIndex: number = cartItems.findIndex(
        (item) => item.item.id === newItem.id
      );
      let isInCart: boolean = itemIndex !== -1;
      if (isInCart) {
        cartItems[itemIndex].quantity += 1;
      } else {
        cartItems.push({
          item: newItem,
          quantity: 1,
        });
      }

      state.items = cartItems;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.item.id !== action.payload
      );
    },
    setQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const cartItems: ICartItem[] = [...state.items];
      const itemIndex: number = cartItems.findIndex(
        (item) => item.item.id === itemId
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
