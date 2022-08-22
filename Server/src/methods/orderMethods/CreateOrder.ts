import { Request, Response } from "express";
import { db } from "../../database/configuration";
import { order_by_user } from "../../interfaces/order";

const CreateOrder = (req: Request, res: Response) => {
  const order: order_by_user = {
    ...req.body,
    invoice_no: Date.now(),
    user_id: req.headers.user_id,
  };
  db.none(
    "insert into orders(invoice_no, user_id, ordered_items, amount) values($1,$2,$3,$4)",
    [order.invoice_no, order.user_id, order.ordered_items, order.amount]
  )
    .then((result: any) => {
      res.status(201).send({ msg: "Order created!!", data: order });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(400).send(err);
    });
};

export default CreateOrder;
