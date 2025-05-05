import { Link } from "react-router-dom";
import type { Category } from "../../types";

interface Props {
  categories: Category[];
}

const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <div className="rounded-2xl shadow p-4 col-span-2">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Categories</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/items"
            className="block hover:bg-gray-100 rounded-2xl p-3 text-gray-700 hover:text-indigo-600"
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              to={`/items/${category._id}`}
              className="block hover:bg-gray-100 rounded-2xl p-3 text-gray-700 hover:text-indigo-600"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
