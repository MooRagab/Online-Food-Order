import { NextFunction, Request, Response } from "express";

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Admin" });
};
  

export const getVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Admin" });
};
  

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Admin" });
};
  