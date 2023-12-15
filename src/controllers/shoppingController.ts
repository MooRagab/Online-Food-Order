import { NextFunction, Request, Response } from "express";

export const shopping = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Shopping" });
};