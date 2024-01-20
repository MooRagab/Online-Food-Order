import { NextFunction, Request, Response } from "express";
import { CreateDeliveryUserInput } from "../dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deliveryUserModel } from "../DB/models";
import { sendEmail } from "../services";

export const deliverySignUp = async (req: Request, res: Response) => {
  const { email, phone, password, address, firstName, lastName, pincode } = <
    CreateDeliveryUserInput
  >req.body;
 
  const vendor = await deliveryUserModel.findOne({ email }).select("email");
  if (vendor) {
    return res.status(409).json({ message: "Email Is Already Exist" });
  } else {
    const vendorPhone = await deliveryUserModel
      .findOne({ phone })
      .select("phone");
    if (vendorPhone) {
      return res.status(409).json({ message: "Phone Number Is Already Used" });
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
      const savedVendor = await deliveryUserModel.create({
        email: email,
        firstName: firstName,
        address: address,
        pincode: pincode,
        lastName: lastName,
        phone: phone,
        password: hash,
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
      const user = await deliveryUserModel.updateOne(
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
