import { Request, Response } from "express";
import { transactionModel, vendorModel } from "../DB/models";
import bcrypt from "bcrypt";
import { createVendorInput } from "../dto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services";

export const createVendor = async (req: Request, res: Response) => {
  const {
    name,
    address,
    foodType,
    email,
    pincode,
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
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
      const savedVendor = await vendorModel.create({
        email: email,
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        ownerName: ownerName,
        phone: phone,
        password: hash,
        coverImages: [],
      });
      if (!savedVendor) {
        res.status(400).json({ message: "Fail to Register, Please Try Again" });
      } else {
        const token = jwt.sign(
          { id: savedVendor._id },
          process.env.EMAIL_TOKEN
        );
        const message = `
      <a href = ${req.protocol}://${req.headers.host}/admin/confirmEmail/${token}>Confirm Email</a>
      `;
        await sendEmail(email, "confirmEmail", message);
        res.status(201).json({ message: "Done!", savedVendor });
      }
    }
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN) as any;
    if (!decoded?.id) {
      res.status(400).json({ message: "In-Valid Token Payload" });
    } else {
      const user = await vendorModel.updateOne(
        {
          _id: decoded.id,
          confirmEmail: false,
        },
        { confirmEmail: true }
      );
      user.modifiedCount
        ? res.status(200).json({ message: "Confirmed Done" })
        : res.status(400).json({ message: "Already Confirmed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
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

export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find();
 
  if (transactions) {
    return res.status(200).json(transactions);
  }

  return res.json({ message: "Transactions data not available" });
};

export const getTransactionById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const transaction = await transactionModel.findById(id);

  if (transaction) {
    return res.status(200).json(transaction);
  }

  return res.json({ message: "Transaction data not available" });
};
