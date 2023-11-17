import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "antd";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import SearchInput from "./../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart]=useCart()
  console.log(categories?.map((c)=>{return c.name}))
  
  const handleLogout = () => {
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: null,
      token: "",
    }));
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    // Use Navigate as a JSX component
    return <Navigate to="/login" />;
  };

  useEffect(() => {
    // Log categories when the component mounts
    console.log("Categories on mount:", categories);
  }, [categories]);

  return (
    <nav className="bg-slate-300">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold" href="#">
              🛒 Peshawrychapal
            </NavLink>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="text-gray-600 hover:bg-gray-400 px-3 py-1 text-sm font-medium">
                  <SearchInput />
                </div>
                <NavLink
                  to="/"
                  className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="text-gray-900 bg-gray-700"
                >
                  Home
                </NavLink>
                <div className="group inline-block relative">
                  <button className="group text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Categories
                  </button>
                  <ul className="absolute hidden bg-white rounded-lg text-black group-hover:block">
                    <li>
                      <NavLink
                        to={"/categories"}
                        className="block px-6 py-2 text-sm hover:bg-gray-400 hover:px-4 rounded-lg"
                        activeClassName="text-gray-900 bg-gray rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        All Categories
                      </NavLink>
                    </li>
                    {categories?.map((c) => (
                      <li key={c._id}>
                        <NavLink
                          to={`/category/${c.slug}`}
                          className="block px-6 py-2 text-sm hover:bg-gray-400 hover:px-4 rounded-lg"
                          activeClassName="text-gray-900 bg-gray-700"
                        >
                          {c.name} {console.log(c.name)}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
                {!auth.user ? (
                  <>
                    <NavLink
                      to="/signup"
                      className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      activeClassName="text-gray-900 bg-gray-700"
                    >
                      Register
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      activeClassName="text-gray-900 bg-gray-700"
                    >
                      Login
                    </NavLink>
                  </>
                ) : (
                  <>
                    <div className="group inline-block relative">
                      <button className="group text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        {auth?.user?.name}
                      </button>
                      <ul className="absolute hidden bg-white rounded-lg text-black group-hover:block" id="name">
                        <li>
                          <NavLink
                            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                            className="block px-4 py-2 rounded-lg text-sm dark:text-gray-200 hover:bg-gray-400 hover:px-4"
                            aria-labelledby="name"
                            activeClassName="text-gray-900 bg-gray rounded-lg shadow w-44 dark:bg-gray-700"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="px-4 py-2 rounded-lg text-sm hover:bg-gray-400"
                            activeClassName="text-gray-900 bg-gray-700"
                          >
                            LogOut
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
                <NavLink
                  to="/cart"
                  className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="text-gray-900 bg-gray-700"
                >
                 <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
