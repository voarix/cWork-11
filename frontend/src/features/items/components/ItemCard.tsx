import type { Item } from "../../../types";
import { apiUrl } from "../../../globalConstants.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  item: Item;
}

const ItemCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="hover:cursor-pointer hover:scale-101 duration-150 rounded-2xl overflow-hidden shadow-lg col-span-1"
      onClick={() => navigate(`/items/full-view/${item._id}`)}
    >
      <div className="w-full h-48">
        <img
          className="w-full h-full object-cover"
          src={apiUrl + "/" + item.image}
          alt={item.title}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.title}</div>
        <p className="text-gray-700 text-sm">{item.price} USD</p>
      </div>
    </div>
  );
};

export default ItemCard;
