import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GlobalError, Item } from "../../types";
import { isAxiosError } from "axios";
import axiosApi from "../../axiosApi.ts";

export const fetchAllItems = createAsyncThunk<Item[],
  string | undefined,
  { rejectValue: GlobalError }
>("items/fetchAllItems", async (category_id, {rejectWithValue}) => {
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