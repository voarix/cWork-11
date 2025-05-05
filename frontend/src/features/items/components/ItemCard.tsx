import type { Item } from "../../../types";
import { apiUrl } from "../../../globalConstants.ts";

interface Props {
  item: Item;
}

const ItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg col-span-1">
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
