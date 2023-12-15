import { NextFunction, Request, Response } from "express";

export const customer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Customer" });
};