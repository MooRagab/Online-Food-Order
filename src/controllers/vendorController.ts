import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { VendorLoginInputs, editVendorInput } from "../dto";
import vendorModel from "../DB/models/Vendor.model";
import jwt from "jsonwebtoken";

export const vendor = async (req: Request, res: Response) => {
  res.json({ message: "Hello from Vendor" });
};

// ------------------------------------LogIn Function--------------------------------------

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
      const token = jwt.sign({ id: user._id }, process.env.SIGNIN_TOKEN, {
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

// ------------------------------------Profile Function--------------------------------------

export const getVendorProfile = async (req: Request, res: Response) => {
  const user = await vendorModel.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    return res.json({ message: "Your Profile", user });
  }
};

// ------------------------------------Update Profile Function--------------------------------------

export const updateVendorProfile = async (req: Request, res: Response) => {
  const { foodType, name, address, phone } = <editVendorInput>req.body;

  const user = await vendorModel.findByIdAndUpdate(
    { _id: req.user._id },
    {
      foodType: foodType,
      name: name,
      address: address,
      phone: phone,
    }
  );
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).json({ message: "Done !" });
  }
};

// ------------------------------------Update Vednor Service--------------------------------------

export const updateVendorService = async (req: Request, res: Response) => {
  const vendorService = await vendorModel.findByIdAndUpdate(
    { _id: req.user._id },
    { serviceAvailable: true }
  );
  if (!vendorService) {
    res.status(404).json({ message: "vendor not found" });
  } else {
    res.status(200).json({ message: "Done !" });
  }
};

// ------------------------------------Add Food--------------------------------------

export const addFood = async (req: Request, res: Response) => {


  
}