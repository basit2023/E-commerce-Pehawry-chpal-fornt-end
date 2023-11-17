import React from 'react'
import Header from './../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Toaster } from "react-hot-toast";
const Layout = () => {
  return (
    <>
      <Header/>
      <main style={{ minHeight: "70vh" }}>
      <Toaster/>
        <Outlet/>
      </main>
      <Footer />
    </>
  )
}

export default Layout
