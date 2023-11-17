import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-200 p-4" style={{ minHeight: "30vh" }}>
      <h1 className="text-center text-lg font-bold">
        All Right Reserved &copy; Peshawrychapal
      </h1>
      <p className="text-center mt-3">
        <Link to="/about" className="text-blue-500 hover:underline ml-3 mr-3">
          About
        </Link>
        |
        <Link to="/contact" className="text-blue-500 hover:underline ml-3 mr-3">
          Contact
        </Link>
        |
        <Link to="/policy" className="text-blue-500 hover:underline ml-3 mr-3">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
