import React, { useState } from "react";
import "./MenuItem.css";
import DropDown from "../dropdown/DropDown";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { CART_URL, category_nonveg, category_veg, STATIC_URL } from "../routes";

interface MenuItemProps {
  menu_id: number;
  name: string;
  img_loc: string;
  dscrptn: string;
  price: number;
  category: string;
  handleRender: any;
}

const options = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const MenuItem = ({
  menu_id,
  name,
  img_loc,
  dscrptn,
  price,
  category,
  handleRender,
}: MenuItemProps) => {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const client_id: string = useAppSelector((state) => state.auth.client_id);
  const [itemSize, setItemSize] = useState<string>("small");

  const AXIOS_CONFIG = {
    headers: {
      user_id: client_id,
    },
  };

  const RESP_BODY = {
    qty: 1,
    size: itemSize,
    add_on: {},
    menu_item: menu_id,
  };

  const addItemInCart = () => {
    if (!isLogin) {
      alert("We would like you to login first");
      return;
    }

    axios
      .post(CART_URL, RESP_BODY, AXIOS_CONFIG)
      .then((result: AxiosResponse) => {
        console.log(result.data);
        handleRender(name);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  return (
    <div className="menu-item-wrapper">
      <div className="menu-item-cvr">
        <img
          src={`${STATIC_URL}/${img_loc}`}
          alt=""
          className="menu-item-pic"
        />
        <img
          src={`${STATIC_URL}/${
            category === "nonveg" ? category_nonveg : category_veg
          }`}
          alt=""
          className="menu-item-category"
        />
        <span className="menu-item-price">{price}</span>
        <button
          className="customize-btn"
          onClick={() => {
            navigate("../customize", { state: { menu_id: menu_id } });
          }}
        >
          customize
        </button>
      </div>
      <div className="menu-item">
        <div className="menu-item-banner">
          <span className="menu-item-name">{name}</span>
          <span className="menu-item-dscrptn">{dscrptn}</span>
        </div>
        {category === "veg" || category === "nonveg" ? (
          <div className="menu-item-data">
            <div className="menu-item-size">
              <DropDown
                dropdownOptions={options}
                handleChange={(res: string) => setItemSize(res)}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <button className="menu-addtocart-btn" onClick={addItemInCart}>
        Add To Cart
      </button>
    </div>
  );
};

export default MenuItem;
