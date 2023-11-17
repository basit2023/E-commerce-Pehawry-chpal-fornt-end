import React from "react";
import { Link } from "react-router-dom";


const Pagenotfound = () => {
  return (
    <div title={"go back- page not found"}>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl text-gray-800 mt-4">Oops! Page Not Found</h2>
        <Link to="/" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Pagenotfound;
