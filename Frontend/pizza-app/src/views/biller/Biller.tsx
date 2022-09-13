import React from "react";
import "./Biller.css";
import { useLocation } from "react-router-dom";
import { Location } from "history";

interface LocationParams {
  state: string;
  //   pathname: string;
}
// const temp_data = `[{"cart_id":34,"qty":1,"add_on":{},"menu_item":2,"size":"small","name":"Double Cheese Margherita","category":"veg","price":379,"dscrptn":"A classic delight loaded with extra 100% real mozzarella cheese.","img_loc":"double_cheese_margherita.webp"},{"cart_id":37,"qty":1,"add_on":{},"menu_item":2,"size":"medium","name":"Double Cheese Margherita","category":"veg","price":379,"dscrptn":"A classic delight loaded with extra 100% real mozzarella cheese.","img_loc":"double_cheese_margherita.webp"},{"cart_id":36,"qty":1,"add_on":{},"menu_item":16,"size":"small","name":"Veg Parcel","category":"sides","price":45,"dscrptn":"Snacky bites! Pizza rolls with paneer & creamy harissa sauce","img_loc":"veg_parcel.webp"},{"cart_id":35,"qty":2,"add_on":{},"menu_item":15,"size":"small","name":"Chicken Pepperoni Stuffed Garlic Bread","category":"sides","price":169,"dscrptn":"Freshly Baked Garlic Bread stuffed with Delectable Chicken Pepperoni, Cheese \r\nand sprinkled with Basil Parsley","img_loc":"chicken_pepporoni_bread.webp"}]`;

const Biller = () => {
  const location = useLocation();
  //   console.log(location.state);
  //   const orders = JSON.parse(temp_data);
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
            
          </div>
          <div className="order-items table-structure"></div>
          <div className="order-items table-structure"></div>
          <div className="order-items table-structure"></div>
        </div>
        <div className="bill-section3"></div>
      </div>
    </div>
  );
};

export default Biller;
