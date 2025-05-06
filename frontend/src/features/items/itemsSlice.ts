import type { GlobalError, Item, ItemFull, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { createNewItem, fetchAllItems, fetchItemById } from "./itemsThunks.ts";
import type { RootState } from "../../app/store.ts";

interface ItemsState {
  items: Item[];
  fetchLoading: boolean;
  fetchError: GlobalError | null;

  oneItem: ItemFull | null;
  fetchOneLoading: boolean;
  fetchOneError: GlobalError | null;

  createItemLoading: boolean;
  createItemError: GlobalError | ValidationError | null;
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

export const selectCreateLoading = (state: RootState) =>
  state.items.createItemLoading;
export const selectCreateError = (state: RootState) =>
  state.items.createItemError;

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,

  oneItem: null,
  fetchOneLoading: false,
  fetchOneError: null,

  createItemLoading: false,
  createItemError: null,
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
      })

      .addCase(createNewItem.pending, (state) => {
        state.createItemLoading = true;
        state.createItemError = null;
      })
      .addCase(createNewItem.fulfilled, (state) => {
        state.createItemLoading = false;
      })
      .addCase(createNewItem.rejected, (state, { payload: error }) => {
        state.createItemLoading = false;
        state.createItemError = error || null;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;
