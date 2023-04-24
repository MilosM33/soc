import { configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./Reducers/Cart/CartReducer";
import { CheckoutReducer } from "./Reducers/Cart/CheckoutReducer";
import { UserReducer } from "./Reducers/User/UserReducer";
import { CategoryReducer } from "./Reducers/Category/CategoryReducer";
import { WishlistReducer } from "./Reducers/Wishlist/WishlistReducer";
import thunkMiddleware from "redux-thunk";
import HamburgerReducer from "./Reducers/Hamburger/HamburgerReducer";

import debounce from "./Api/Utils/Debounce";

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

const saveCart = debounce(() => {
	localStorage.setItem("cart", JSON.stringify(store.getState().cart));

	console.log("cart");
}, 2000);
store.subscribe(() => {
	saveCart();
});

export default store;
