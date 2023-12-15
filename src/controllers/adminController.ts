import { NextFunction, Request, Response } from "express";

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Admin" });
};
  