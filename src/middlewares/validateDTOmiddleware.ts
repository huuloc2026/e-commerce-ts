import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";


export const validateMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const dtoInstance = plainToInstance(dtoClass, req.body, {
      excludeExtraneousValues: true,
    });
    req.body = dtoInstance;
    const errors = await validate(dtoInstance);
    if (errors.length > 0 && errors) {
      const messages = errors
        .map((err) => {
          return Object.values(err.constraints || {}).join(", ");
        })
        .flat();
        return res.status(401).json({
          messages: messages[0],
        })
    }
    next();
  };
};
