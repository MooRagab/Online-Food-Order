import { NextFunction, Request, Response } from "express";

export const delivery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Delivery" });
};
