import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../AdminMenu/AdminMenu";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { Select } from "antd";
import apiService from "../../../utils/apiService";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await apiService.get("/user/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await apiService.put(`/user/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
console.log("the order is:",orders)
  return (
    <div title={"All Orders Data"}>
      <div className="flex">
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="w-3/4 p-8">
          <h1 className="text-center text-3xl font-bold mb-8">All Orders</h1>
          {orders?.map((o, i) => (
            <div key={o._id} className="border shadow mb-8">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                {o?.products?.map((p, i) => (
                  <div key={p._id} className="flex mb-4">
                    <div className="w-1/4">
                      <img
                        src={`/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="w-3/4 pl-4">
                      <p className="text-xl font-semibold">{p.name}</p>
                      <p className="text-gray-600">{p.description.substring(0, 30)}</p>
                      <p className="text-lg">Price: {p.price}</p>
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

export default AdminOrders;
