import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCategories } from "./categoriesSlice.ts";
import { useEffect } from "react";
import { fetchAllCategories } from "./categoriesThunks.ts";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="rounded-2xl shadow p-4 col-span-2">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Categories</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to={`/`}
            className="block hover:bg-gray-100 rounded-2xl p-3 text-gray-700 hover:text-indigo-600"
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              to={`/${category._id}`}
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
