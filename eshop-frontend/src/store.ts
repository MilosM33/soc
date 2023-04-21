import { configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./Reducers/Cart/CartReducer";
import { CheckoutReducer } from "./Reducers/Cart/CheckoutReducer";
import { UserReducer } from "./Reducers/User/UserReducer";
import { CategoryReducer } from "./Reducers/Category/CategoryReducer";
import { WishlistReducer } from "./Reducers/Wishlist/WishlistReducer";
import applyMiddleware from "redux-thunk";
import thunkMiddleware from "redux-thunk";
import HamburgerReducer from "./Reducers/Hamburger/HamburgerReducer";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    checkout: CheckoutReducer,
    user: UserReducer,
    categories: CategoryReducer,
    wishlist: WishlistReducer,
    hamburger: HamburgerReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
