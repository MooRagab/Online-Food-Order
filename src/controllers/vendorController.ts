import { NextFunction, Request, Response } from "express";

export const vendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Vendor" });
};  