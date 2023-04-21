import { createSlice } from "@reduxjs/toolkit";

const hamburgerSlice = createSlice({
  name: "hamburger",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleHamburger: (state) => {
      state.isOpen = !state.isOpen;
    },
    setHamburger: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleHamburger, setHamburger } = hamburgerSlice.actions;
export default hamburgerSlice.reducer;
