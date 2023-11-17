import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();

  return (
    <div title={"All Categories"}>
      <div className="container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div key={c._id}>
              <div className="bg-white p-6 rounded-md shadow-md">
                <Link
                  to={`/category/${c.slug}`}
                  className="block text-xl font-semibold text-gray-800 hover:text-gray-900"
                >
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
