import { Request, Response } from "express";
import { db } from "../../database/configuration";

const DB_QUERY = `
update
	cart
set
	qty = $1
where
	cart_id = $2
and
    user_id = $3
`;

const UpdateCart = (req: Request, res: Response) => {
  const user_id = req.headers.user_id;
  const cart_id = req.params.id;
  const qty = req.params.qty;

  db.none(DB_QUERY, [qty, cart_id, user_id])
    .then(() => {
      res.status(200).send("Qty has been updated!!");
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default UpdateCart;
