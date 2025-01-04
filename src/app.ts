import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet"
import morgan from "morgan";
import compression from "compression";

import instanceMongoDb from "./database/data-source";
import routes from "./routes/index.routes";




console.clear();


const app = express()

// Middleware
// app.use(morgan("dev"))
// app.use(helmet())
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(cookieParser());

app.use(routes)



app.use(function (req, res, next) {
  if (res.headersSent) {
    return next();
  }
  res.status(404).json({ error: 'page not found' });
});
instanceMongoDb



export default app;