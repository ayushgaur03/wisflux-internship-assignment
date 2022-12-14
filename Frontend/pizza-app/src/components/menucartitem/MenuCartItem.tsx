import React from "react";
import { category_nonveg, category_veg, STATIC_URL } from "../routes";
import "./MenuCartItem.css";

interface CartItem {
  img_loc: string;
  name: string;
  qty: number;
  category: string;
  add_on: string;
  price: number;
  changeQty: any;
  size: string;
}

const MenuCartItem = ({
  img_loc,
  name,
  qty,
  category,
  add_on,
  price,
  changeQty,
  size,
}: CartItem) => {
  return (
    <div className="cart-item">
      <div className="cart-img">
        <img
          src={`${STATIC_URL}/${img_loc}`}
          className={"item-img"}
          alt="item_pic"
        />
        <img
          src={`${STATIC_URL}/${
            category === "nonveg" ? category_nonveg : category_veg
          }`}
          className={"item-category"}
          alt="item-category"
        />
      </div>
      <div className="cart-item-data">
        <span className="item-name">{name}</span>
        {category === "veg" || category === "nonveg" ? (
          <>
            <span className="item-modified">{add_on}</span>
            <span className="item-size">{size}</span>
          </>
        ) : (
          <></>
        )}
        <span className="item-price">{price} /- each</span>
      </div>
      <div className="item-qty">
        <button onClick={() => changeQty(qty + 1)}>+</button>
        <span>{qty}</span>
        <button onClick={() => changeQty(qty - 1)}>-</button>
      </div>
    </div>
  );
};

export default MenuCartItem;
