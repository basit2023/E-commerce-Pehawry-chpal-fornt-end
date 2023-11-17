import React from "react";
import UserMenu from "../../UserMenu/UserMenu";
import { useAuth } from "../../../context/auth";

const Dashboard = () => {
  const [auth,setAuth] = useAuth();
  console.log("the out is:",auth)
  return (
    <div title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="flex flex-row">
          <div className="w-1/4">
            <UserMenu />
          </div>
          <div className="w-3/4">
            <h1> Dashboard</h1>
            <div className="bg-white w-3/4 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{auth?.user?.name}</h3>
              <h3 className="text-lg mb-4">{auth?.user?.email}</h3>
              <h3 className="text-lg mb-4">{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
