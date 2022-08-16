import { Request, Response } from "express";
import { db } from "../../database/configuration";
import { client_bio } from "../../interfaces/user";
import { v4 as uuidv4 } from "uuid";

const Registration = (req: Request, res: Response) => {
  const record: client_bio = {
    ...req.body,
    user_id: uuidv4(),
  };
  console.log(record);
  db.none(
    "insert into users(name, email, user_id, mobile_no, password) values($1,$2,$3,$4,$5)",
    [
      record.name,
      record.email,
      record.user_id,
      record.mobile_no,
      record.password,
    ]
  )
    .then(() => {
      let client_side_data: Partial<client_bio> = record;
      delete client_side_data.password;
      res
        .status(201)
        .send({ msg: "User registered succesfully!!", data: client_side_data });
    })
    .catch((err: any) => {
      res.status(400).send(err);
    });
};

export default Registration;
