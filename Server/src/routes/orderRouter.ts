import { Request, Response, Router } from "express";
import CreateOrder from "../methods/orderMethods/CreateOrder";
import GetOrdersOfUser from "../methods/orderMethods/GetOrdersOfUser";

const orderRouter: Router = Router();

orderRouter.get("", (req: Request, res: Response) => {
  GetOrdersOfUser(req, res);
});
orderRouter.post("", (req: Request, res: Response) => {
  CreateOrder(req, res);
});

export default orderRouter;
