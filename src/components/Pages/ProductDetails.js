import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Produc.css"
import apiService from "../../utils/apiService";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await apiService.get(
        `/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await apiService.get(
        `product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={`/product/product-photo/${product._id}`}
            className="object-cover w-full md:w-96 h-72 md:h-full rounded-lg"
            alt={product.name}
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Product Details
          </h1>
          <hr className="border-t-2 border-gray-300" />
          <h6 className="text-gray-700">Name: {product.name}</h6>
          <h6 className="text-gray-700">Description: {product.description}</h6>
          <h6 className="text-gray-700">
            Price:{" "}
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6 className="text-gray-700">Category: {product?.category?.name}</h6>
          <button className="btn btn-secondary mt-2">ADD TO CART</button>
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />
      <div className="container mx-auto my-8">
        <h4 className="text-xl md:text-2xl font-bold mb-4">
          Similar Products ➡️
        </h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts?.map((p) => (
            <div key={p._id} className="card relative">
              <img
                src={`/product/product-photo/${p._id}`}
                className="object-cover w-full h-44"
                alt={p.name}
              />
              <div className="card-body p-4">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
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
                <div className="card-name-price">
                  <button
                    className="btn btn-info mt-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
