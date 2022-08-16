import express, { NextFunction, Request, Response } from "express";

const appLogger = (req: Request, res: Response, next: NextFunction) => {
  // url, method, time, data
  let url: any = req.url;
  let method: any = req.method;
  let time: any = new Date().toLocaleTimeString();
  let date: any = new Date().toLocaleDateString();
  let result: string = `[${url}]-[${method}]->[${date}-${time}]`;
  console.log(result);
  next(); // mandatory
};

export default appLogger;
