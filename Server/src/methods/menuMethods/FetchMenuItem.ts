import { Request, Response } from "express";
import { db } from "../../database/configuration";

const DB_QUERY = `
select 
  name, 
  price, 
  category, 
  dscrptn,
  img_location,
  used_in_pizza as ingredients
from 
  menu 
where 
  id=$1
`;

const FetchMenuItem = (req: Request, res: Response) => {
  const item_id: string = req.params.menu_id;
  db.one(DB_QUERY, item_id)
    .then((result: any) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default FetchMenuItem;
