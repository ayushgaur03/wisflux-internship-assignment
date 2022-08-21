import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/menu");
  }, []);

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
