import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { VendorLoginInputs } from "../dto/vendor.dto";
import vendorModel from "../DB/models/Vendor.model";

export const vendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Vendor" });
};
export const vendorLogin = async (req: Request, res: Response) => {
  const { email, password } = <VendorLoginInputs>req.body;
  const vendor = await vendorModel.findOne({ email });
  if (!vendor) {
    res.status(404).json({ message: "Email not found" });
  } else {
    if (!vendor.confirmEmail) {
      res.status(401).json({ message: "Please Confirm Your Email First" });
    } else {
      const matchPass = bcrypt.compareSync(password, vendor.password);
      if (!matchPass) {
        res.status(401).json({ message: "Wrong Password" });
      } else {
        res.status(200).json({ message: "Done" });
      }
    }
  }
};
