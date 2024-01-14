import { NextFunction, Request, Response } from "express";
import { CreateCustomerInput } from "../dto";
import { customerModel } from "../DB/models";
import bcrypt from "bcrypt";
import { GenerateOtp } from "../services";

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
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
      const { otp, expiry } = GenerateOtp();
      const savedCustomer = await customerModel.create({
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        otp: otp,
        otp_expires: expiry,
        address: ''
      });
    }
  }
};
