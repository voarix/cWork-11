import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GlobalError,
  Item,
  ItemFull,
  ItemMutation,
  ValidationError,
} from "../../types";
import { isAxiosError } from "axios";
import axiosApi from "../../axiosApi.ts";
import type { RootState } from "../../app/store.ts";

export const fetchAllItems = createAsyncThunk<
  Item[],
  string | undefined,
  { rejectValue: GlobalError }
>("items/fetchAllItems", async (category_id, { rejectWithValue }) => {
  try {
    const url = category_id ? `/items?category=${category_id}` : "/items";
    const response = await axiosApi(url);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const fetchItemById = createAsyncThunk<
  ItemFull,
  string,
  { rejectValue: GlobalError; state: RootState }
>("items/fetchItemById", async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const response = await axiosApi(`/items/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const createNewItem = createAsyncThunk<
  void,
  ItemMutation,
  { rejectValue: GlobalError | ValidationError; state: RootState }
>("items/createNewItem", async (itemToAdd, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const formData = new FormData();
    const keys = Object.keys(itemToAdd) as (keyof ItemMutation)[];

    keys.forEach((key) => {
      const value = itemToAdd[key] as string;
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("/items", formData, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const deleteItem = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError; state: RootState }
>("items/deleteItem", async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    await axiosApi.delete(`/items/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
