import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import Homepage from './components/Pages/Home/Homepage';
import SignUpPage from './components/UserDetails/SignUpPage';
import Login from './components/UserDetails/Login';
import ForgetPassword from './components/UserDetails/ForgetPassword';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Dashboard from './components/Pages/user/Dashboard';
import Pagenotfound from './components/Pages/Home/Pagenotfound';
import PrivateRoute from './components/Routes/PrivateRoute';
import Order from './components/Pages/user/Order';
import Profile from './components/Pages/user/Profile';
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashboard from './components/Pages/Admin/AdminDashboard';
import CreateCategory from './components/Pages/Admin/CreateCategory';
import CreateProducs from './components/Pages/Admin/CreateProducs';
import Products from './components/Pages/Admin/Products';
import UpdateProduct from './components/Pages/Admin/UpdateProduct';
import Search from './components/Search';
import ProductDetails from './components/Pages/ProductDetails';
import Categories from './components/Pages/Categories';
import CategoryProduct from './components/Pages/CategoryProduct';
import CartPage from './components/Pages/CartPage';
import AdminOrders from './components/Pages/Admin/AdminOrders';
import Contact from './components/Contect/Contact';
import About from './components/About/About';
import Policy from './components/Policy';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Header/>}/> */}
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Homepage />} />
            <Route path="search" element={<Search />} />
            <Route path="categories" element={<Categories />} />
            <Route path="cart" element={<CartPage />} />

            <Route path="product/:slug" element={<ProductDetails />} />
            <Route path="category/:slug" element={<CategoryProduct />} />


            
            <Route path="dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Order />} />
            <Route path="user/profile" element={<Profile />} />
            </Route>
            
            <Route path="dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProducs />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<AdminOrders />} />

            </Route>

            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<Login />} />
            <Route path="forget" element={<ForgetPassword />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="policy" element={<Policy />} />
            <Route path="*" element={<Pagenotfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;