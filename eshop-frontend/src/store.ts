import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./Reducers/Cart/CartReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
