import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];
const wishlistJson = localStorage.getItem("wishlistedProducts");

if (wishlistJson) {
  initialState.push(...JSON.parse(wishlistJson));
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addToWishlist: (state, action: any) => {
      const product = action.payload;
      console.log(product);
      state.push(product);
      localStorage.setItem("wishlistedProducts", JSON.stringify(state));
    },
    removeFromWishlist: (state, action: any) => {
      const product = action.payload;
      const index = state.findIndex((p: any) => p.id === product.id);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("wishlistedProducts", JSON.stringify(state));
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const WishlistReducer = wishlistSlice.reducer;
