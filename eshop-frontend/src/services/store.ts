import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/CartReducer";
import wishlistReducer from "./Wishlist/WishlistReducer";
import userReducer from "./User/UserReducer";
import productReducer from "../components/ShoppingPreview/ProductPreviewReducer";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    product: productReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
