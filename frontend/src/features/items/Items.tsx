import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchItemsError,
  selectFetchItemsLoading,
  selectItems,
} from "./itemsSlice.ts";
import Categories from "../categories/Categories.tsx";
import ItemList from "./components/ItemList.tsx";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesFetchLoading,
} from "../categories/categoriesSlice.ts";
import Loading from "../../components/UI/Loading.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAllCategories } from "../categories/categoriesThunks.ts";
import { fetchAllItems } from "./itemsThunks.ts";

const Items = () => {
  const dispatch = useAppDispatch();
  const errorItems = useAppSelector(selectFetchItemsError);
  const errorCategories = useAppSelector(selectCategoriesError);
  const items = useAppSelector(selectItems);
  const categories = useAppSelector(selectCategories);
  const { category_id } = useParams();

  useEffect(() => {
    dispatch(fetchAllItems(category_id));
    dispatch(fetchAllCategories());
  }, [fetchAllItems, dispatch, category_id, fetchAllCategories]);

  const categoryLoading = useAppSelector(selectCategoriesFetchLoading);
  const itemLoading = useAppSelector(selectFetchItemsLoading);

  if (categoryLoading || itemLoading) {
    return <Loading />;
  }

  if (errorItems || errorCategories) {
    return <h1>Error. Please try again later</h1>;
  }

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-3 mt-10">
      <Categories categories={categories} />
      <ItemList items={items} />
    </div>
  );
};

export default Items;
