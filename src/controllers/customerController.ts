import { NextFunction, Request, Response } from "express";
import { CreateCustomerInput } from "../dto";
import { customerModel } from "../DB/models";
import bcrypt from "bcrypt";
import { GenerateOtp, sendEmail } from "../services";
import jwt from "jsonwebtoken";

export const customerSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, phone } = <CreateCustomerInput>(
    req.body
  );
  const customer = await customerModel.findOne({ email }).select("email");
  if (customer) {
    res.status(409).json({ message: "Email already exists" });
  } else {
    const customerPhone = await customerModel
      .findOne({ phone })
      .select("phone");
    if (customerPhone) {
      res.status(409).json({ message: "Phone is already used" });
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
      const { otp, expiry } = GenerateOtp();
      const savedCustomer = await customerModel.create({
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: "",
      });
      if (!savedCustomer) {
        res.status(400).json({ message: "Fail to Register, Please Try Again" });
      } else {
        const token = jwt.sign(
          { id: savedCustomer._id },
          process.env.EMAIL_TOKEN
        );
        const message = `
      <a href = ${req.protocol}://${req.headers.host}/customer/confirmemail/${token}>Confirm Email</a>
      `;
        await sendEmail(email, "confirmEmail", message);
        res.status(201).json({ message: "Done!", savedCustomer });
      }
    }
  }
};

export const confirmCustomerEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN) as any;
    if (!decoded?.id) {
      res.status(400).json({ message: "In-Valid Token Payload" });
    } else {
      const user = await customerModel.updateOne(
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
