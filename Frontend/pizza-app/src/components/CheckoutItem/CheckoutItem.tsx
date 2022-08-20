import React from "react";
import "./CheckoutItem.css";

const STATIC_URL = "http://localhost:4000/static";
const category_nonveg = "nonveg.png";
const category_veg = "veg.jfif";

interface Item {
  name: string;
  price: number;
  dscrptn: string;
  category: string;
  customization: string;
  qty: number;
  changeQty: any;
  img_loc: string;
}

const CheckoutItem = ({
  name,
  price,
  dscrptn,
  customization,
  qty,
  changeQty,
  category,
  img_loc,
}: Item) => {
  return (
    <div className="checkout-item">
      <div className="checkout-img-section">
        <img src={`${STATIC_URL}/${img_loc}`} className="checkout-img" alt="" />
        <img
          src={`${STATIC_URL}/${
            category === "nonveg" ? category_nonveg : category_veg
          }`}
          className={"category-img"}
          alt=""
        />
      </div>
      <div className="checkout-text">
        <span className="item-name">{name}</span>
        <span className="item-desc">{dscrptn}</span>
        {category === "veg" || category === "nonveg" ? (
          <span className="item-customization">{customization}</span>
        ) : (
          <></>
        )}
      </div>
      <div className="checkout-price">
        <span className="item-price">{price.toFixed(2)}</span>
        <div className="item-qty">
          <button onClick={() => changeQty(qty + 1)}>+</button>
          <span>{qty}</span>
          <button onClick={() => changeQty(qty - 1)}>-</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
