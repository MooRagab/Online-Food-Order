import { NextFunction, Request, Response } from "express";
import { VendorLoginInputs } from "../dto/vendor.dto";

export const vendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Vendor" });
};
export const vendorLogin = async (req: Request, res: Response) => {
  const { email, password } = <VendorLoginInputs>req.body;

  
};
