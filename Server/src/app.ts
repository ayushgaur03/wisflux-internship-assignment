import express, { Router, Request, Response } from "express";
import { Application } from "express";
import appLogger from "./middleware/appLogger";
import authRouter from "./routes/authRouter";
import path from "path";

var cors = require("cors");
const app: Application = express();

const port: number = 4000;
app.set("port", 4000);

const router: Router = Router();

/*
 * Configuring express to recieve data in JSON format
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
 * MiddleWare Configuration
 */
app.use(appLogger);

/*
 * Router Configuration
 */
app.use("/auth", authRouter);

/*
 * Static Media configuration
 */
app.use("/static", express.static(path.join(__dirname, "assets/pics/")));

export default app;