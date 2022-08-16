import { Request, Response } from "express";
import { db } from "../../database/configuration";
import { cart_item } from "../../interfaces/cart";

const DB_QUERY = `
insert 
  into cart 
values(default,$5,$1,$2,$3,$4)
`;

const AddToCart = (req: Request, res: Response) => {
  const item: cart_item = { ...req.body, user_id: req.headers.user_id };

  const DB_VALUES = Object.values(item);
  console.log(DB_VALUES);

  db.none(DB_QUERY, DB_VALUES)
    .then((result: any) => {
      console.log(result);
      res.status(201).send("Item added to the cart successfully");
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default AddToCart;
