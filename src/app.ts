import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet"
import morgan from "morgan";
import compression from "compression";
import { UserController } from "./models/User/User.controller";
import { validateMiddleware } from "./middlewares/validatemiddleware";
import { UserDTO } from "./models/User/DTO/UserDTO";

console.clear();

const app = express();

// Middleware
app.use(morgan("dev"))
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(cookieParser());
app.use(helmet())
app.use(compression());


const usercontroller = new UserController
app.post("/", validateMiddleware(UserDTO),usercontroller.TestController);


app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
    welcome: "Welcome to my website",
  });
  return
});

export default app;