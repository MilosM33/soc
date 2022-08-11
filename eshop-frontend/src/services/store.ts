import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/CartReducer";
import wishlistReducer from "./Wishlist/WishlistReducer";
import userReducer from "./User/UserReducer";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
