import React, { useState, useEffect } from "react";
import AdminMenu from "../../AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import apiService from "../../../utils/apiService";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await apiService.get("/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="w-3/4 p-4">
          <h1 className="text-center text-2xl font-bold mb-4">
            All Products List
          </h1>
          <div className="flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 product-link"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={`${apiService.defaults.baseURL}/product/product-photo/${p._id}`}
                    className="w-full h-40 object-cover"
                    alt={p.name}
                  />
                  <div className="p-4">
                    <h5 className="text-xl font-semibold mb-2">{p.name}</h5>
                    <p className="text-gray-600">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
