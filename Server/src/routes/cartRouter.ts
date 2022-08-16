import { Request, Response, Router } from "express";
import AddToCart from "../methods/cartMethods/AddToCart";
import DeleteCartItem from "../methods/cartMethods/DeleteCartItem";
import FetchCart from "../methods/cartMethods/FetchCart";
import UpdateCart from "../methods/cartMethods/UpdateCart";

const cartRouter: Router = Router();

cartRouter.post("", (req: Request, res: Response) => {
  AddToCart(req, res);
});

cartRouter.get("", (req: Request, res: Response) => {
  FetchCart(req, res);
});

cartRouter.put("/:id/:qty", (req: Request, res: Response) => {
  UpdateCart(req, res);
});

cartRouter.delete("/:id", (req: Request, res: Response) => {
  DeleteCartItem(req, res);
});

export default cartRouter;
