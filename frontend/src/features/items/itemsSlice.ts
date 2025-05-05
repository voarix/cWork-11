import type { GlobalError, Item } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllItems } from "./itemsThunks.ts";
import type { RootState } from "../../app/store.ts";

interface ItemsState {
  items: Item[];
  fetchLoading: boolean;
  fetchError: GlobalError | null;
}

export const selectItems = (state: RootState) => state.items.items;
export const selectFetchItemsLoading = (state: RootState) =>
  state.items.fetchLoading;
export const selectFetchItemsError = (state: RootState) =>
  state.items.fetchError;

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchAllItems.fulfilled, (state, { payload: items }) => {
        state.items = items;
        state.fetchLoading = false;
      })
      .addCase(fetchAllItems.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.fetchError = error || null;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
