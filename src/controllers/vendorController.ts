import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { VendorLoginInputs, VendorPayload } from "../dto";
import vendorModel from "../DB/models/Vendor.model";
import jwt from "jsonwebtoken";

export const vendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Hello from Vendor" });
};

export const vendorLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body as VendorLoginInputs;
  try {
    const user = await vendorModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    if (!user.confirmEmail) {
      return res
        .status(401)
        .json({ message: "Please Confirm Your Email First" });
    }
    const matchPass = bcrypt.compareSync(password, user.password);
    if (!matchPass) {
      return res.status(401).json({ message: "Wrong Password" });
    } else {
      const token = jwt.sign({ id: user._id } , process.env.SIGNIN_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      return res
        .status(200)
        .json({ message: "Login Succesfully !", Token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const user = await vendorModel.findById(req.user._id) ;

  return res.json({ message: "vendor Information Not Found" ,user});
};
  