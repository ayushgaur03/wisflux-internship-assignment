import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Menu from "./views/menu/Menu";
import Checkout from "./views/checkout/Checkout";
import Customize from "./views/customize/Customize";
import Login from "./views/login/Login";
import Biller from "./views/biller/Biller";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="menu" element={<Menu />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="customize" element={<Customize />} />
            <Route path="biller" element={<Biller />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
