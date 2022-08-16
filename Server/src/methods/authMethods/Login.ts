import { Request, Response } from "express";
import { db } from "../../database/configuration";

const regexExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

const login_type = (username: string) => {
  return `select user_id, name, password from users where 
    ${username.indexOf("@") > 0 ? "email" : "mobile_no"} = $1`;
};

const Login = (req: Request, res: Response) => {
  const client_username: string = req.body.username;
  const client_password: string = req.body.password;

  const search_param = login_type(client_username);
  console.log(search_param);

  db.one(search_param, client_username)
    .then((result: any) => {
      if (result.password === client_password)
        res
          .status(200)
          .send({ msg: "User verified successfully!!", data: result });
      else res.status(401).send("The user password is incorrect.");
    })
    .catch((err: any) => {
      console.log(err);
      res.status(400).send("No user found!!");
    });
};

export default Login;
