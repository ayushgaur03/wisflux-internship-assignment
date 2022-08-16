import { Request, Response } from "express";
import { db } from "../../database/configuration";
import { pizza_item } from "../../interface/menu";

const CategorizedPizzas = (req: Request, res: Response) => {
  const filter_by: string = req.params.cat;
  db.many("select * from menu where category=$1", filter_by)
    .then((result: Array<pizza_item>) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default CategorizedPizzas;
