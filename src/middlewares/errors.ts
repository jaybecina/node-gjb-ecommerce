import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    messaage: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
