import { Router, Request, Response } from "express";
import Login from "../methods/authMethods/Login";
import Registration from "../methods/authMethods/Registration";

const authRouter: Router = Router();

authRouter.post("/register", (req: Request, res: Response) =>
  Registration(req, res)
);

authRouter.post("/login", (req: Request, res: Response) => Login(req, res));

export default authRouter;
