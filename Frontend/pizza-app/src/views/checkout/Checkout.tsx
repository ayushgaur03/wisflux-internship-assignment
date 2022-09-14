import React, { useState, useEffect } from "react";
import "./Checkout.css";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../../app/store";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import { useNavigate } from "react-router-dom";
import { CART_URL, ORDERS_URL } from "../../components/routes";

interface CheckoutItems {
  cart_id: number;
  qty: number;
  add_on: object;
  menu_item: 10;
  size: string;
  name: string;
  category: string;
  price: number;
  img_loc: string;
  dscrptn: string;
}

const Checkout = () => {
  const navigation = useNavigate();
  const client_id: string = useAppSelector((state) => state.auth.client_id);
  const client_name: string = useAppSelector((state) => state.auth.client_name);
  const [qty, setQty] = useState<number>(0);
  const [items, setItems] = useState<Array<CheckoutItems>>([]);
  const navigate = useNavigate();

  let subTotal: number = 0;
  const AXIOS_CONFIG = {
    headers: {
      user_id: client_id,
    },
  };

  const fetchCart = () => {
    axios
      .get(CART_URL, AXIOS_CONFIG)
      .then((result: AxiosResponse) => {
        setItems(result.data);
      })
      .catch((err: AxiosError) => {
        console.warn(err);
      });
  };

  const placeOrder = () => {
    const REQ_BODY = {
      ordered_items: items,
      amount: 1.12 * subTotal + 30,
    };
    axios
      .post(`${ORDERS_URL}`, REQ_BODY, {
        headers: {
          user_id: "213b3007-120e-4b6f-b970-b1c2eb8cb580",
        },
      })
      .then((result: AxiosResponse) => {
        navigate("../biller");
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, [qty]);

  const updateQuantity = (q: number, cart_id: number) => {
    axios
      .put(`${URL}/${cart_id}/${q}`, {}, AXIOS_CONFIG)
      .then((result: AxiosResponse) => {
        setQty(q);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const deleteItem = (cart_id: number) => {
    axios
      .delete(`${URL}/${cart_id}`, AXIOS_CONFIG)
      .then((result) => {
        setQty(0);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <div className="page-container">
      <section className="left">
        <div className="left-text">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <span className="banner">Please check your cart !!</span>
        </div>
        <div className="checkout-display">
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

              subTotal = subTotal + finalPrice * item.qty;
              return (
                <CheckoutItem
                  key={id}
                  name={item.name}
                  price={finalPrice}
                  dscrptn={item.dscrptn}
                  customization={customize}
                  category={item.category}
                  qty={item.qty}
                  changeQty={(q: number) =>
                    q > 0
                      ? updateQuantity(q, item.cart_id)
                      : deleteItem(item.cart_id)
                  }
                  img_loc={item.img_loc}
                />
              );
            })}
        </div>
      </section>
      <section className="right">
        <div className="billing-container">
          <h3 className="heading">Billing To:</h3>
          <div className="client-info">
            <span className="client-name">{client_name}</span>
            <p className="client-address">
              {"Flat: 1, Nirupum Vatika, Sector-1, Noida - 201307"}
            </p>
            <span className="client-contact">+91-9876543210</span>
          </div>
        </div>
        <div className="price-container">
          <div className="price-tags">
            <span className="label">Subtotal: </span>
            <span className="price-value">{subTotal}</span>
          </div>
          <div className="price-tags">
            <span className="label">Taxes:</span>
            <span className="price-value">{(0.12 * subTotal).toFixed(2)}</span>
          </div>
          <div className="price-tags">
            <span className="label">Charges:</span>
            <span className="price-value">{(30).toFixed(2)}</span>
          </div>
          <div className="price-tags-final">
            <span className="label-final">Grand Total:</span>
            <span className="price-value-final">
              {(1.12 * subTotal + 30).toFixed(2)}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className={"place-btn"}
          onClick={() => placeOrder()}
        >
          Place Order
        </button>
      </section>
    </div>
  );
};

export default Checkout;
