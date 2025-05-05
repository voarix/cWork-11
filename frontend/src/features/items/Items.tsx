import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectItems } from "./itemsSlice.ts";
import { fetchAllItems } from "./itemsThunks.ts";

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  console.log(items);

  return <div></div>;
};

export default Items;
