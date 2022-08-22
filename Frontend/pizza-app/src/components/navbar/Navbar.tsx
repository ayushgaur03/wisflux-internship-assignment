import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const client_name: string = useAppSelector((state) => state.auth.client_name);
  useEffect(() => {
    navigate("/menu");
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="left-section">Pizza Monger</div>
        <div className="right-section">
          {isLogin ? (
            <span>{client_name}</span>
          ) : (
            <button onClick={() => navigate("../login")}>Login / SignUp</button>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
