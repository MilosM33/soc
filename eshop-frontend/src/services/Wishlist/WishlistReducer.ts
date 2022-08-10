import { createSlice } from "@reduxjs/toolkit";

export interface WishState {
  wishlist: number[];
}

const items = JSON.parse(localStorage.getItem("wishlist") ?? "[]");
const initialState: WishState = {
  wishlist: items,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const newItem: number = action.payload;
      state.wishlist.push(newItem);

      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter((item) => item !== action.payload);

      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
