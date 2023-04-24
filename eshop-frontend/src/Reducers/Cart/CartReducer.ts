import { createSlice } from "@reduxjs/toolkit";
import { ICartItem, ICartItemVariant } from "./ICartItem";

export interface ICartState {
	items: ICartItem[];
	isOpen: boolean;
}

let initialState: ICartState = {
	items: [],
	isOpen: false,
};

if (localStorage.getItem("cart") != null) {
	initialState = JSON.parse(localStorage.getItem("cart") ?? "");
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload as ICartItem;

			const existingItem = state.items.find(
				(x) =>
					x.id === item.id &&
					x.selectedVariant?.name === item.selectedVariant?.name
			);

			if (existingItem) {
				existingItem.quantity += item.quantity;
			} else {
				state.items.push(item);
			}
		},
		removeFromCart: (state, action) => {
			const item = action.payload as ICartItem;

			const existingItem = state.items.find(
				(x) =>
					x.title === item.title &&
					x.selectedVariant?.name === item.selectedVariant?.name
			);

			if (existingItem) {
				state.items.splice(state.items.indexOf(existingItem), 1);
			}
		},
		updateQuantity: (state, action) => {
			const item = action.payload as ICartItem;

			const existingItem = state.items.find(
				(x) =>
					x.id === item.id &&
					x.selectedVariant?.name === item.selectedVariant?.name
			);

			if (existingItem) {
				existingItem.quantity = item.quantity;
			}
		},
		changeVariant: (state, action) => {
			const item = action.payload.item as ICartItem;
			const variant = action.payload.selectedVariant as ICartItemVariant;
			// if variant already in cart, update quantity
			const existingItem = state.items.find(
				(x) => x.id === item.id && x.selectedVariant.name === variant.name
			);
			if (existingItem) {
				existingItem.quantity += item.quantity;

				// remove item from state.items
				state.items = state.items.filter(
					(x) =>
						x.id !== item.id ||
						x.selectedVariant.name !== item.selectedVariant.name
				);
			} else {
				// otherwise, change variant
				const existingItem = state.items.find(
					(x) =>
						x.id === item.id &&
						x.selectedVariant.name === item.selectedVariant.name
				);
				if (existingItem) {
					existingItem.selectedVariant = variant;
				}
			}
		},
		toggleCart: (state) => {
			state.isOpen = !state.isOpen;
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const CartReducer = cartSlice.reducer;
export const {
	addToCart,
	removeFromCart,
	updateQuantity,
	toggleCart,
	changeVariant,
	clearCart,
} = cartSlice.actions;
