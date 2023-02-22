import { createSlice } from "@reduxjs/toolkit";

export interface CheckoutState {
  items: any[];
  shippingForm: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    appartment: string;
    deliveryMethod: string;
    email: string;
    phone: string;
  };
  paymentType: string;
  orderNumber: string;
  clientSecret: string;
}

const initialState: CheckoutState = {
  items: [],
  shippingForm: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    appartment: "",
    deliveryMethod: "",
    email: "",
    phone: "",
  },
  paymentType: "",
  orderNumber: "",
  clientSecret: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingForm: (state, action) => {
      state.shippingForm = action.payload;
    },
    setPaymentType: (state, action) => {
      state.paymentType = action.payload;
    },

    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
  },
});

export const {
  setShippingForm,
  setPaymentType,
  setOrderNumber,
  setClientSecret,
} = checkoutSlice.actions;
export const CheckoutReducer = checkoutSlice.reducer;
