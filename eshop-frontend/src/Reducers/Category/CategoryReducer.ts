import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
  categories: any[];
  subCategories: any[];
  subCategoriesState: "loading" | "success" | "error";
  selectedCategory: any;
}

const initialState: CategoryState = {
  categories: [],
  subCategories: [],
  subCategoriesState: "error",
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },

    setSubCategoriesState: (state, action) => {
      state.subCategoriesState = action.payload;
    },
  },
});
export const CategoryReducer = categorySlice.reducer;
export const {
  setCategories,
  setSelectedCategory,
  setSubCategories,
  setSubCategoriesState,
} = categorySlice.actions;
