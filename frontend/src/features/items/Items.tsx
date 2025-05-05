import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectItems } from "./itemsSlice.ts";
import { fetchAllItems } from "./itemsThunks.ts";
import Categories from "../categories/Categories.tsx";
import ItemList from "./components/ItemList.tsx";

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  console.log(items);

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-3 mt-10">
      <Categories />
      <ItemList />
    </div>
  );
};

export default Items;
