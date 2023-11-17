import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apiService from "../../utils/apiService";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.post("/user/forget", {
        email,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setShowPasswordInput(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.post("/user/otp", {
        email,
        otp,
        newPassword,
      });
      console.log("Response from the server:", res.data);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const sendToken = async () => {
    try {
      const res = await apiService.post("/user/forget", {
        email,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full">
        <h4 className="text-center text-2xl mb-8">RESET PASSWORD</h4>
        {!showPasswordInput && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Enter Your email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Your Email"
              required
            />
          </div>
        )}
        {showPasswordInput && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter OTP"
              required
            />
          </div>
        )}
        {showPasswordInput && (
          <div className="mb-4">
            <label htmlFor="passowrd" className="block text-sm font-medium text-gray-700">
              Enter Your New Password
            </label>
            <input
            id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Your New Password"
              required
            />
          </div>
        )}

        {!showPasswordInput && (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Token
          </button>
        )}
        {showPasswordInput && (
          <>
          <button
            onClick={handleResetPassword}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button
            onClick={sendToken}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Resend OTP 
          </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
