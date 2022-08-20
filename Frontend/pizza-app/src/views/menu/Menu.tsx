import React from "react";
import MenuCart from "../../components/menucart/MenuCart";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="main-page">
      <div className="menu-container">
        <div className="menu-filter">
          <ul className="menu-list">
            {/* <MenuItem itemName={"veg"} active={""} label={"Veg Pizza"} />
            <MenuItem itemName={"nonveg"} active="" label={"Non-Veg Pizza"} />
            <MenuItem itemName={"sides"} active="" label={"Sides"} />
            <MenuItem itemName={"beverages"} active="" label={"Beverages"} /> */}
          </ul>
        </div>
        <div className="menu display">
          <div className="category-container" id="veg">
            <div className="category-label">Veg Pizzas</div>
            <div className="category-items">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
              velit saepe nisi quas. Libero mollitia sed ex reprehenderit
              officia. Sed eveniet et maiores quasi, nihil laborum labore
              corporis iure expedita non maxime. Perspiciatis molestiae eius,
              itaque doloremque ut autem illum soluta quibusdam, nesciunt animi
              minus earum nihil aliquid nam est, inventore beatae sunt facilis
              provident similique atque laborum omnis quo quasi! Provident sit,
              sapiente dolor quidem ratione molestiae. Maiores debitis
              voluptatibus aspernatur quaerat facilis repellendus mollitia quos
              ducimus cum consectetur!
            </div>
          </div>
        </div>
      </div>
      <MenuCart />
    </div>
  );
};

export default Menu;
