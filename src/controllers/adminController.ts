import {Request, Response } from "express";
import vendorModel from "../DB/models/Vendor.model";
import bcrypt from "bcrypt";
export const createVendor = async (
  req: Request,
  res: Response,
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = req.body;

  const vendor = await vendorModel.findOne({ email }).select("email");
  if (vendor) {
    res.status(409).json({ message: "Email Is Already Exist" });
  } else {
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const savedVendor = await vendorModel.create({
      name,
      address,
      pincode,
      foodType,
      ownerName,
      phone,
      password: hash
    });
  }
};

export const getVendor = async (
  req: Request,
  res: Response,
) => {
  res.json({ message: "Hello from Admin" });
};

export const getVendorById = async (
  req: Request,
  res: Response,
) => {
  res.json({ message: "Hello from Admin" });
};
