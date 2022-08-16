import { Request, Response, Router } from "express";
import CategorizedPizzas from "../methods/menuMethods/CategorizedPizzas";
import FetchMenu from "../methods/menuMethods/FetchMenu";
import FetchMenuItem from "../methods/menuMethods/FetchMenuItem";

const menuRouter: Router = Router();

menuRouter.get("", (req: Request, res: Response) => {
  FetchMenu(req, res);
});

menuRouter.get("/:cat", (req: Request, res: Response) => {
  CategorizedPizzas(req, res);
});

menuRouter.get("/item/:menu_id", (req: Request, res: Response) => {
  FetchMenuItem(req, res);
});

export default menuRouter;
