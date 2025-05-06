import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { itemSchema } from "../../../zodSchemas/itemsSchemas.ts";
import {
  selectCategories,
  selectCategoriesFetchLoading,
} from "../../categories/categoriesSlice.ts";
import { fetchAllCategories } from "../../categories/categoriesThunks.ts";
import Loading from "../../../components/UI/Loading.tsx";
import type {
  GlobalError,
  ItemMutation,
  ValidationError,
} from "../../../types";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface Props {
  onSubmitItem: (item: ItemMutation) => void;
  loading: boolean;
  error: ValidationError | GlobalError | null;
}

const ItemForm: React.FC<Props> = ({ onSubmitItem, loading, error }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetchLoading);

  interface ItemFormData {
    title: string;
    description: string;
    price: string;
    image: File | null;
    category: string;
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const getFielError = (fieldName: string) => {
    if (!error) return undefined;

    if ("errors" in error && error.errors[fieldName]) {
      return error.errors[fieldName].message;
    }

    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }

    return undefined;
  };

  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset, watch } =
    useForm<ItemFormData>({
      resolver: zodResolver(itemSchema),
      defaultValues: {
        title: "",
        description: "",
        price: "0",
        image: null,
        category: "",
      },
    });

  const onSubmit = async (data: ItemMutation) => {
    onSubmitItem({ ...data });
    reset();
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setValue("image", files[0]);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-sm rounded-lg p-6 space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              {...register("title")}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                Boolean(getFielError("title")) ? "border-red-500" : "border"
              }`}
            />
            {getFielError("title") && (
              <p className="mt-1 text-sm text-red-600">
                {getFielError("title")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("description")}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                Boolean(getFielError("description"))
                  ? "border-red-500"
                  : "border"
              }`}
            />
            {getFielError("description") && (
              <p className="mt-1 text-sm text-red-600">
                {getFielError("description")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              {...register("price")}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                Boolean(getFielError("price")) ? "border-red-500" : "border"
              }`}
            />
            {getFielError("price") && (
              <p className="text-red-500 text-sm">{getFielError("price")}</p>
            )}{" "}
            {getFielError("price") && (
              <p className="mt-1 text-sm text-red-600">
                {getFielError("price")}
              </p>
            )}
          </div>

          {categoriesLoading ? (
            <Loading />
          ) : (
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  Boolean(getFielError("category"))
                    ? "border-red-500"
                    : "border"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              {getFielError("category") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFielError("category")}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={fileInputChangeHandler}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {watch("image") && (
                  <p className="text-sm text-gray-500 mt-2">
                    {watch("image")?.name}
                  </p>
                )}
                {getFielError("image") && (
                  <p className="mt-1 text-sm text-red-600">
                    {getFielError("image")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ItemForm;
