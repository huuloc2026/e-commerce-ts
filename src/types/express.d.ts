import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      objKey?: any;
    }
  }
    interface Error {
      status?: number; 
    }
}
