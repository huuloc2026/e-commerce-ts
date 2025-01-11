import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import instanceMongoDb from "./database/data-source";
import routes from "./routes/index.routes";
import envConfig from "src/config/config";

console.clear();

// Initialize MongoDB
instanceMongoDb;

// Create Express app
const app = express();

// Middleware
app.use(morgan("dev")); // Logging
app.use(helmet()); // Security headers
app.use(compression()); // Response compression
app.use(express.json({ limit: "50kb" })); // Parse JSON requests
app.use(express.urlencoded({ limit: "50kb", extended: true })); // Parse URL-encoded requests
app.use(cookieParser()); // Cookie parsing

// Routes
app.use('/v1/api',routes);

// Handle 404 Errors
app.use((req, res, next) => {
  const error = new Error("Page not found") as any;
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${new Date().toISOString()}] Error: ${message}`);
  if (envConfig.node_env === "development") {
    if (err.stack) console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    status,
    message,
  });
});


export default app;
