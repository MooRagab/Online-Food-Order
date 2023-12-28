import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { VendorLoginInputs } from "../dto/vendor.dto";
import vendorModel from "../DB/models/Vendor.model";
import { GenerateSignature } from "../services/signature";



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
    }
    const signature = await GenerateSignature({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
    return res
      .status(200)
      .json({ message: "Login Succesfully !", token: signature });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getVendorProfile = async (req: Request, res: Response) => {
  const profile = await vendorModel.findById(req.user._id);
  res.status(200).json({ message: "Done", profile });
};
