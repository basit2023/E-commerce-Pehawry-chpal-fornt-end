import React, { useState, useEffect } from "react";
import UserMenu from "../../UserMenu/UserMenu";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import apiService from "../../../utils/apiService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await apiService.get("/user/orders");
      
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div title={"Your Orders"} className="container-fluid p-3 m-3 dashboard">
      <div className="flex">
        <div className="w-1/4">
          <UserMenu />
        </div>
        <div className="w-3/4">
          <h1 className="text-center text-2xl font-bold mb-4">All Orders</h1>
          {orders?.map((o, i) => (
            <div key={i} className="border shadow mb-4 p-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{o?.status}</td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                {o?.products?.map((p, i) => (
                  <div key={i} className="flex mb-4">
                    <div className="w-1/4">
                      <img
                        src={`/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="w-3/4 pl-4">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
