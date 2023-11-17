import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/cart";
import "../styles/Category.css"
import toast from "react-hot-toast";
import "../styles/Homepage.css"
import apiService from "../../utils/apiService";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart]=useCart()
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await apiService.get(
        `/product/product-category/${params.slug}`
      );
    
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-3">
        <h4 className="text-center text-2xl font-bold mb-2">
          Category - {category?.name}
        </h4>
        <h6 className="text-center mb-4">
          {products?.length} result{products?.length !== 1 && "s"} found
        </h6>
        <div className="flex flex-wrap">
          {products?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${apiService.defaults.baseURL}/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h5 className="card-title text-lg font-semibold">
                    {p.name}
                  </h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text text-gray-700">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="flex justify-between items-center">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* Uncomment the following block for "ADD TO CART" functionality */}
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Uncomment the following block for "Loadmore" functionality */}
        {/* <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "Loadmore"}
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CategoryProduct;
