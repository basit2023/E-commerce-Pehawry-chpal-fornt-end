import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center dashboard-menu">
      <div className="list-group">
        <h4 className="text-xl font-bold">Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="block text-blue-600 hover:text-blue-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md my-2"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="block text-blue-600 hover:text-blue-800 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md my-2"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
