import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectItems } from "../itemsSlice.ts";
import { useEffect } from "react";
import { fetchAllItems } from "../itemsThunks.ts";
import ItemCard from "./ItemCard.tsx";

const ItemList = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  return (
    <div className="col-span-3 grid grid-cols-2 gap-4">
      {items.map((item) => (
        <ItemCard item={item} key={item._id} />
      ))}
    </div>
  );
};

export default ItemList;
