import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/CartReducer";
import wishlistReducer from "./Wishlist/WishlistReducer";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

store.subscribe(() =>{
  console.log(store.getState());
})

export default store;
