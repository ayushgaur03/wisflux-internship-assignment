import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/store";
import MenuCartItem from "../menucartitem/MenuCartItem";
import "./MenuCart.css";
import { useNavigate } from "react-router-dom";

interface CartItemFromServer {
  cart_id: number;
  qty: number;
  add_on: object;
  menu_item: number;
  size: string;
  name: string;
  category: string;
  price: number;
  img_loc: string;
}

const URL = "http://localhost:4000/cart";

const MenuCart = () => {
  const navigate = useNavigate();
  const client_id = useAppSelector((state) => state.auth.client_id);

  const [qty, setQty] = useState<number>(0);
  const [items, setItems] = useState<Array<CartItemFromServer>>([]);
  // const [subtotal, setSubtotal] = useState<number>(0);
  let subtotal: number = 0;

  const AXIOS_CONFIG = {
    headers: {
      user_id: client_id,
    },
  };

  useEffect(() => {
    axios
      .get(URL, AXIOS_CONFIG)
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [qty, client_id]);

  const updateQuantity = (q: number, cart_id: number) => {
    console.log(client_id);
    axios
      .put(`${URL}/${cart_id}/${q}`, {}, AXIOS_CONFIG)
      .then((result) => {
        console.log(result);
        setQty(q);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (cart_id: number) => {
    axios
      .delete(`${URL}/${cart_id}`, AXIOS_CONFIG)
      .then((result) => {
        console.log(result.data);
        setQty(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cart-container">
      <div className="cart-header"> Your Cart</div>
      <div className="cart-display">
        {items &&
          items.map((item, id) => {
            let customize: string = "";
            let finalPrice: number = item.price;
            if (item.size === "large") finalPrice *= 1.3;
            if (item.size === "small") finalPrice *= 0.75;

            Object.entries(item.add_on).forEach((obj) => {
              customize += obj[0] + ", ";
              finalPrice += obj[1] * 60;
            });

            subtotal = subtotal + finalPrice * item.qty;
            return (
              <MenuCartItem
                key={id}
                img_loc={item.img_loc}
                name={item.name}
                add_on={customize}
                size={item.size}
                qty={item.qty}
                category={item.category}
                price={finalPrice}
                changeQty={(q: number) =>
                  q > 0
                    ? updateQuantity(q, item.cart_id)
                    : deleteItem(item.cart_id)
                }
              />
            );
          })}
      </div>
      <div className="cart-footer">
        <span className="cart-subtotal">Rs. {subtotal} /-</span>
        <button type="submit" className="cart-submit-btn" onClick={()=>navigate("../checkout")}>
          checkout
        </button>
      </div>
    </div>
  );
};

export default MenuCart;