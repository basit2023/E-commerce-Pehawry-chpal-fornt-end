import React from "react";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <div className="container mx-auto my-8" title={"Search results"}>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <h6 className="text-gray-600 mb-4">
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} Products`}
        </h6>
        <div className="flex flex-wrap justify-center">
          {values?.results.map((p) => (
            <div
              key={p._id}
              className="card m-2 bg-white shadow-md rounded-lg overflow-hidden"
              style={{ width: "18rem" }}
            >
              <img
                src={`/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title text-xl font-semibold mb-2">
                  {p.name}
                </h5>
                <p className="card-text text-gray-700 mb-4">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="card-text text-green-600 font-bold mb-4">
                  $ {p.price}
                </p>
                <button className="btn btn-primary ms-1">More Details</button>
                <button className="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
