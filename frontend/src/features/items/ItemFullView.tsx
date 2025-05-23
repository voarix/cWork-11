import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDeleteError,
  selectDeleteLoading,
  selectOneItem,
  selectOneItemError,
  selectOneItemLoading,
} from "./itemsSlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem, fetchItemById } from "./itemsThunks.ts";
import Loading from "../../components/UI/Loading.tsx";
import { apiUrl } from "../../globalConstants.ts";
import { toast } from "react-toastify";

const ItemFullView = () => {
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectOneItem);
  const loading = useAppSelector(selectOneItemLoading);
  const error = useAppSelector(selectOneItemError);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const deleteError = useAppSelector(selectDeleteError);
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteItemById = () => {
    const deletePermission = window.confirm("Are you sure you want to delete this item?");
    if (!deletePermission) return;

    try {
      if (id) dispatch(deleteItem(id)).unwrap;
      toast.success("Item was successfully deleted!");
      navigate("/");
    } catch (e) {
      toast.error("Error while deleting item. Please try again later.");
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) dispatch(fetchItemById(id));
  }, [dispatch, id]);

  if (error || deleteError) {
    return <h1 className="accent-red-600">Error, please try again</h1>;
  }

  return (
    <>
      {loading || deleteLoading ? (
        <Loading />
      ) : !item ? (
        <div>Item not found.</div>
      ) : (
        <div className="max-w-7xl mx-auto py-8 rounded-2xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {item.image && (
              <img
                className="w-2/3 h-100 object-cover mx-auto rounded-2xl"
                src={`${apiUrl}/${item.image}`}
                alt={item.title}
              />
            )}
            <div className="p-6 flex flex-col space-y-5">
              <h1 className="text-2xl font-bold text-gray-800">{item.title}</h1>
              <p className="text-gray-700 text-base">{item.description}</p>
              <p className="mb-4 text-blue-500 font-semibold">
                Price: {item.price} USD
              </p>
              <p className="mb-4 text-red-700 font-semibold">
                Category {item.category?.title}
              </p>
              <div className="flex flex-col space-y-1 text-gray-500 font-semibold">
                <h3 className="text-lg font-semibold text-gray-700 ">
                  My contacts:
                </h3>
                <p>Username: {item.seller?.username}</p>
                <p>Display Name: {item.seller?.displayName}</p>
                <p>Phone Number: +{item.seller?.phoneNumber}</p>
              </div>
              {item.isSeller && <button onClick={deleteItemById} className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-xl shadow transition-all duration-150">Delete</button>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemFullView;
