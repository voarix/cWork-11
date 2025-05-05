import type { Category } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories } from "./categoriesThunks.ts";
import type { RootState } from "../../app/store.ts";

interface CategoryState {
  categories: Category[];
  fetchLoading: boolean;
  fetchError: boolean;
}

export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectCategoriesFetchLoading = (state: RootState) =>
  state.categories.fetchLoading;
export const selectCategoriesError = (state: RootState) =>
  state.categories.fetchError;

const initialState: CategoryState = {
  categories: [],
  fetchLoading: false,
  fetchError: true,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = false;
      })
      .addCase(
        fetchAllCategories.fulfilled,
        (state, { payload: categories }) => {
          state.categories = categories;
          state.fetchLoading = false;
        },
      )
      .addCase(fetchAllCategories.rejected, (state) => {
        state.fetchLoading = false;
        state.fetchError = true;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
