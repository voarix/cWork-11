import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllCategories = createAsyncThunk<Category[], void>(
  "categories/fetchAllCategories",
  async () => {
    const response = await axiosApi("/categories");
    return response.data;
  },
);
