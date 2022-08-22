import React, { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../../app/store";
import MenuCart from "../../components/menucart/MenuCart";
import "./Menu.css";
import MenuItem from "../../components/menuitem/MenuItem";
import { MENU_URL } from "../../components/routes";

interface MenuData {
  category: string;
  dscrptn: string;
  id: number;
  img_location: string;
  name: string;
  price: number;
  fixed: {
    "add-ons": Array<string>;
    fixed: Array<string>;
  };
}

const Menu = () => {
  const client_id = useAppSelector((state) => state.auth.client_id);
  const [menu, setMenu] = useState<string>("veg");
  const [header, setHeader] = useState<string>("Veg Pizza");
  const [menuData, setMenuData] = useState<Array<MenuData>>([]);
  const [render, setRender] = useState<string>("");

  const AXIOS_CONFIG: object = {
    headers: {
      user_id: client_id,
    },
  };

  const fetchMenuData = () => {
    axios
      .get(`${MENU_URL}/${menu}`, AXIOS_CONFIG)
      .then((result: AxiosResponse) => {
        setMenuData(result.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMenuData();
  }, [menu]);

  return (
    <div className="main-page">
      <div className="menu-container">
        <div className="menu-filter">
          <ul className="menu-list">
            <li className="menu-heading">
              <button
                className="menu-btn"
                onClick={() => {
                  setMenu("veg");
                  setHeader("Veg Pizza");
                }}
              >
                Veg Pizza
              </button>
            </li>
            <li className="menu-heading">
              <button
                className="menu-btn"
                onClick={() => {
                  setMenu("nonveg");
                  setHeader("Non-Veg Pizza");
                }}
              >
                Non-Veg Pizza
              </button>
            </li>
            <li className="menu-heading">
              <button
                className="menu-btn"
                onClick={() => {
                  setMenu("sides");
                  setHeader("Sides");
                }}
              >
                Sides
              </button>
            </li>
            <li className="menu-heading">
              <button
                className="menu-btn"
                onClick={() => {
                  setMenu("beverage");
                  setHeader("Beverages");
                }}
              >
                Beverages
              </button>
            </li>
          </ul>
        </div>
        <div className="menu-display">
          <div className="menu-label">
            <span>{header}</span>
          </div>
          <div className="menu-items">
            {menuData &&
              menuData.map((obj, id) => (
                <MenuItem
                  key={id}
                  menu_id={obj.id}
                  name={obj.name}
                  dscrptn={obj.dscrptn}
                  category={obj.category}
                  img_loc={obj.img_location}
                  price={obj.price}
                  handleRender={(item_name: string) => setRender(item_name)}
                />
              ))}
            {/* <MenuItem
              name={"Cheesy Dip"}
              dscrptn={"Cheesy Dip to eat"}
              img_loc={"cheesy_dip.webp"}
              price={60}
            /> */}
          </div>
        </div>
      </div>
      <MenuCart render_item={render} />
    </div>
  );
};

export default Menu;
