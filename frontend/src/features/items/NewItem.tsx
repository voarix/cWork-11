import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCreateError, selectCreateLoading } from "./itemsSlice.ts";
import type { ItemMutation } from "../../types";
import { createNewItem } from "./itemsThunks.ts";
import { toast } from "react-toastify";
import ItemForm from "./components/ItemForm.tsx";

const NewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadingCreate = useAppSelector(selectCreateLoading);
  const errorCreate = useAppSelector(selectCreateError);

  const onCreateNewItem = async (newItem: ItemMutation) => {
    try {
      await dispatch(createNewItem(newItem)).unwrap();
      toast.success("Item was successfully created!");
      navigate("/");
    } catch (e) {
      toast.error("Item failed to create a new post!");
      console.error(e);
    }
  };

  return (
    <div>
      <ItemForm
        onSubmitItem={onCreateNewItem}
        loading={loadingCreate}
        error={errorCreate}
      />
    </div>
  );
};

export default NewItem;
