import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import DropDown from "../../components/dropdown/DropDown";
import {
  category_nonveg,
  category_veg,
  MENU_URL,
  STATIC_URL,
} from "../../components/routes";
import "./Customize.css";

interface ItemInterface {
  name: string;
  price: number;
  category: string;
  img_location: string;
  dscrptn: string;
  ingredients: {
    fixed: Array<string>;
    "add-ons": Array<string>;
  };
}

const options = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const Customize = () => {
  const nav_props: any = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const client_id: string = useAppSelector((state) => state.auth.client_id);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const [itemData, setItemData] = useState<ItemInterface>();
  const [pizzaSize, setPizzaSize] = useState<string>("small");

  const fetchItemDetails = () => {
    axios
      .get(`${MENU_URL}/item/${nav_props.state.menu_id}`)
      .then((result: AxiosResponse) => {
        setItemData(result.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  const getPrice = (init_price: number, size: string) => {
    if (size === "small") return 0.7 * init_price;
    else return size === "medium" ? init_price : 1.25 * init_price;
  };

  const AXIOS_CONFIG: object = {
    headers: {
      user_id: client_id,
    },
  };

  const RESP_BODY = {
    qty: 1,
    size: pizzaSize,
    add_on: {},
    menu_item: nav_props.state.menu_id,
  };

  const addItemInCart = () => {
    if (!isLogin) {
      alert("We would like you to login first");
      return;
    }
    axios
      .post("http://localhost:4000/cart", RESP_BODY, AXIOS_CONFIG)
      .then((result: AxiosResponse) => {
        console.log(result.data);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      })
      .finally(() => {
        navigate("../menu");
      });
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  return (
    <div className="custom-container">
      <div className="custom-item-wrapper">
        <div className="custom-img-cover">
          {itemData && (
            <>
              <img
                className={"custom-pizza-img"}
                src={`${STATIC_URL}/${itemData?.img_location}`}
                alt=""
              />
              <img
                className={"custom-item-category"}
                src={`${STATIC_URL}/${
                  itemData?.category === "nonveg"
                    ? category_nonveg
                    : category_veg
                }`}
                alt=""
              />
            </>
          )}
        </div>
        <div className="custom-item-details">
          <div className="custom-item-header">
            <span>{itemData?.name}</span>
          </div>
          <div className="custom-item-data">
            <span className="custom-item-dscrptn">{itemData?.dscrptn}</span>
            <div className="custom-item-ingredients">
              <label htmlFor="item">Made from:</label>
              <span id="item-ing">
                {itemData?.ingredients.fixed.map((str, id) => str + ", ")}
              </span>
            </div>
          </div>
          <div className="custom-pizza-sellout">
            <div className="dropdown-container">
              <DropDown
                dropdownOptions={options}
                handleChange={(res: string) => setPizzaSize(res)}
              />
            </div>
            <span className="custom-pizza-price">
              {itemData && getPrice(itemData.price, pizzaSize).toFixed(2)}
            </span>
            <button className="custom-addtocart-btn" onClick={addItemInCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="custom-options">
        <div className="veg-custom-section"></div>
        <div className="nonveg-custom-section"></div>
      </div>
    </div>
  );
};

export default Customize;
