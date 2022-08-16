import { Request, Response } from "express";
import { db } from "../../database/configuration";

const FetchMenuItem = (req: Request, res: Response) => {
  const item_id: string = req.params.menu_id;
  db.one(
    "select name, price, category, img_location from menu where id=$1",
    item_id
  )
    .then((result: any) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default FetchMenuItem;
