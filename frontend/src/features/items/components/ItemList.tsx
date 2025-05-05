import ItemCard from "./ItemCard.tsx";
import type { Item } from "../../../types";

interface Props {
  items: Item[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <div className="col-span-3 grid grid-cols-2 gap-4">
      {items.map((item) => (
        <ItemCard item={item} key={item._id} />
      ))}
    </div>
  );
};

export default ItemList;
