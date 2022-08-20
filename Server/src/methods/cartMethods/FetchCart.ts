import { Request, Response } from "express";
import { db } from "../../database/configuration";
import { cart_item } from "../../interfaces/cart";

const DB_QUERY: string = `
select 
    cart.cart_id,
    cart.qty , 
    cart.add_on, 
    cart.menu_item,
    cart.size,
    menu.name,
    menu.category,
    menu.price,
    menu.dscrptn,
    menu.img_location as img_loc
from 
    cart 
left join menu on 
    (cart.menu_item = menu.id) 
where 
    cart.user_id = $1;`;

const FetchCart = (req: Request, res: Response) => {
  const user_id = req.headers.user_id;

  db.any(DB_QUERY, user_id)
    .then((result: Partial<cart_item>) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default FetchCart;
