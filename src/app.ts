import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet"
import morgan from "morgan";
import compression from "compression";

import instanceMongoDb from "./database/data-source";
import { createExpressServer } from "routing-controllers";

import { ShopController } from "./models/Shop/Shop.Controller";


console.clear();

const app = createExpressServer({
  routePrefix: "/api", // All routes will be prefixed with /api
  controllers: [ShopController], // Register your controllers here
});

// Middleware
app.use(morgan("dev"))
// app.use(helmet())
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(cookieParser());
app.use(compression());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

instanceMongoDb


export default app;