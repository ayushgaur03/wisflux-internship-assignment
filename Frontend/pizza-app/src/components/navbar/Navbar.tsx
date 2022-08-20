import React from "react";
import { Outlet } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="left-section">Pizza Monger</div>
        <div className="right-section">Login/SignUp</div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
