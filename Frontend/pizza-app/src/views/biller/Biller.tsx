import React, { useState, useEffect } from "react";
import "./Biller.css";
import axios from "axios";

export interface order {
  id: number;
  invoice_no: string;
  ordered_items: Array<{
    cart_id: number;
    qty: number;
    add_on: object;
    menu_item: number;
    size: string;
    name: string;
    category: string;
    price: number;
    dscrptn: string;
    img_loc: string;
  }>;
  amount: string;
  order_date: string;
  order_time: string;
}

const Biller = () => {
  const [orderEntry, setOrderEntry] = useState<order>();
  const client_id = "213b3007-120e-4b6f-b970-b1c2eb8cb580";

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/", {
        headers: {
          user_id: client_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrderEntry(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="biller-page-container">
      <div className="bill-section-container">
        <div className="bill-section1">
          <div className="section-title">
            <span>Order Confirmed</span>
          </div>
          <div className="section-data">
            <div className="bill-data-row">
              <span className="bill-data-cat">Order Id: </span>
              {orderEntry?.invoice_no}
            </div>
            <div className="bill-data-row">
              <span className="bill-data-cat">Customer Name: </span>Virat Kohli
            </div>
            <div className="bill-data-row">
              <span className="bill-data-cat">Delivery Address: </span>
              Arihant Arden, Sector-1, Greater Noida(West)
            </div>
            <div className="bill-data-row">
              <span className="bill-data-cat">Contact Details:</span>
              +91-9711153250
            </div>
          </div>
        </div>
        <div className="bill-section2">
          <div className="order-labels table-structure">
            <div className="order-label-id">S.No.</div>
            <div className="order-label-name">Order Item</div>
            <div className="order-label-custom">Item Size</div>
            <div className="order-label-price">Price</div>
          </div>
          {orderEntry &&
            orderEntry.ordered_items.map((order, id) => {
              const getPrice = (): string => {
                let num: number = 13;
                if (order.menu_item > num || order.size === "medium") {
                  console.log(order.name);
                  return order.price.toFixed(2);
                } else if (order.size === "small")
                  return (order.price * 0.75).toFixed(2);
                else return (order.price * 1.3).toFixed(2);
              };

              return (
                <div key={id} className="order-items table-structure">
                  <div className="bill-item-id">{id + 1}.</div>
                  <div className="bill-item-name">{order.name}</div>
                  <div className="bill-item-custom">{order.size}</div>
                  <div className="bill-item-price">{getPrice()}</div>
                </div>
              );
            })}
        </div>
        <div className="bill-section3">
          <div className="bill-component">
            <div className="bill-amount-label">Charges</div>
            <div className="bill-amount-figure">30.00</div>
          </div>
          <div className="bill-component">
            <div className="bill-amount-label">Taxes</div>
            <div className="bill-amount-figure">
              {orderEntry &&
                (((parseInt(orderEntry.amount) - 30) / 1.12) * 0.12).toFixed(2)}
            </div>
          </div>
          <div className="bill-component">
            <div className="bill-amount-label bold">Amount Paid:</div>
            <div className="bill-amount-figure bold">
              {orderEntry && parseFloat(orderEntry.amount).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biller;
