import type { GlobalError, Item, ItemFull } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllItems, fetchItemById } from "./itemsThunks.ts";
import type { RootState } from "../../app/store.ts";

interface ItemsState {
  items: Item[];
  fetchLoading: boolean;
  fetchError: GlobalError | null;

  oneItem: ItemFull | null;
  fetchOneLoading: boolean;
  fetchOneError: GlobalError | null;
}

export const selectItems = (state: RootState) => state.items.items;
export const selectFetchItemsLoading = (state: RootState) =>
  state.items.fetchLoading;
export const selectFetchItemsError = (state: RootState) =>
  state.items.fetchError;

export const selectOneItem = (state: RootState) => state.items.oneItem;
export const selectOneItemLoading = (state: RootState) =>
  state.items.fetchLoading;
export const selectOneItemError = (state: RootState) => state.items.fetchError;

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,
  oneItem: null,
  fetchOneLoading: false,
  fetchOneError: null,
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
      })

      .addCase(fetchItemById.pending, (state) => {
        state.fetchOneLoading = true;
        state.fetchOneError = null;
      })
      .addCase(fetchItemById.fulfilled, (state, { payload: item }) => {
        state.oneItem = item;
        state.fetchOneLoading = false;
      })
      .addCase(fetchItemById.rejected, (state, { payload: error }) => {
        state.fetchOneLoading = false;
        state.fetchOneError = error || null;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
