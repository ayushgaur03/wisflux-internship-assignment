import { Request, Response } from "express";
import { db } from "../../database/configuration";

const DB_QUERY: string = `
delete 
from
    cart
where
    cart_id = $1
and
    user_id = $2
`;

const DeleteCartItem = (req: Request, res: Response) => {
  const cart_id = req.params.id;
  const user_id = req.headers.user_id;

  db.none(DB_QUERY, [cart_id, user_id])
    .then(() => {
      res.status(200).send("The item has been deleted.");
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default DeleteCartItem;
