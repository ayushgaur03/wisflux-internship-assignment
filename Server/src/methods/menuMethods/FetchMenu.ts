import { Request, Response } from "express";
import { db } from "../../database/configuration";
import { pizza_item } from "../../interface/menu";

const FetchMenu = (req: Request, res: Response) => {
  db.many("select * from menu")
    .then((result: Array<pizza_item>) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(400).send("Unable to fetch the data");
    });
};

export default FetchMenu;
