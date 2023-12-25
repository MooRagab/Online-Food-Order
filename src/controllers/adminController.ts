import { Request, Response } from "express";
import vendorModel from "../DB/models/Vendor.model";
import bcrypt from "bcrypt";
import { createVendorInput } from "../dto/vendor.dto";

export const createVendor = async (req: Request, res: Response) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <createVendorInput>req.body;

  const vendor = await vendorModel.findOne({ email }).select("email");
  if (vendor) {
    return res.status(409).json({ message: "Email Is Already Exist" });
  } else {
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const savedVendor = await vendorModel.create({
      name: name,
      address: address,
      pincode: pincode,
      foodType: foodType,
      ownerName: ownerName,
      phone: phone,
      password: hash,
      rating: 0,
      serviceAvailable: false,
      coverImages: [],
    });

    return res.status(200).json({ message: "Done", savedVendor });
  }
};

export const getVendor = async (req: Request, res: Response) => {
  res.json({ message: "Hello from Admin" });
};

export const getVendorById = async (req: Request, res: Response) => {
  res.json({ message: "Hello from Admin" });
};
