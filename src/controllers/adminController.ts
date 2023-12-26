import { Request, Response } from "express";
import vendorModel from "../DB/models/Vendor.model";
import bcrypt from "bcrypt";
import { createVendorInput } from "../dto/vendor.dto";
import jwt from "jsonwebtoken";
import sendEmail from "../services/Email";

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
    const vendorPhone = await vendorModel.findOne({ phone }).select("phone");
    if (vendorPhone) {
      return res.status(409).json({ message: "Phone Number Is Already Used" });
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
      const savedVendor = await vendorModel.create({
        email: email,
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
      if (!savedVendor) {
        res.status(400).json({ message: "Fail to Register, Please Try Again" });
      } else {
        const token = jwt.sign({ id: savedVendor._id }, process.env.EMAILTOKEN);
        const message = `
      <a href = ${req.protocol}://${req.headers.host}/admin/confirmEmail/${token}>Confirm Email</a>
      `;
        await sendEmail(email, "confirmEmail", message);
        res.status(201).json({ message: "Done!" });
      }
    }
  }
};

export const getVendors = async (req: Request, res: Response) => {
  const vendors = await vendorModel.find();
  if (vendors.length) {
    return res.status(200).json({ message: "Vendors List", vendors: vendors });
  } else {
    return res.status(404).json({ message: "There Is No Vendors" });
  }
};

export const getVendorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const vendor = await vendorModel.findById({ _id: id });
  if (!vendor) {
    return res.status(404).json({ message: "Vendor Not Found" });
  } else {
    return res.status(200).json({ message: vendor });
  }
};
