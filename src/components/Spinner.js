import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
    
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-center text-2xl">Redirecting to you in {count} second(s)</h1>
        <div className="border-4 border-blue-500 rounded-full w-16 h-16 border-t-4 animate-spin mt-4"></div>
      </div>
    </>
  );
};

export default Spinner;
