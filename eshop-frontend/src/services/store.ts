import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/CartReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() =>{
  console.log(store.getState());
})

export default store;
