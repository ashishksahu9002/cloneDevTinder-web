import React from "react";
import NavBar from "./Header/NavBar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
