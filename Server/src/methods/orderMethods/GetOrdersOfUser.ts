import { Request, Response } from "express";
import { db } from "../../database/configuration";
import { order_bill } from "../../interfaces/order";

const GetOrdersOfUser = (req: Request, res: Response) => {
  db.any("select * from orders where user_id=$1", req.headers.user_id)
    .then((result: Array<order_bill>) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default GetOrdersOfUser;
