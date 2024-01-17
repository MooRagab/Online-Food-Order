import { NextFunction, Request, Response } from "express";
import {
  CreateCustomerInput,
  OrderInputs,
  editCustomerProfileInput,
} from "../dto";
import { customerModel, foodModel, orderModel } from "../DB/models";
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

      const savedCustomer = await customerModel.create({
        email: email,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: "",
        orders: [],
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

export const customerLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await customerModel.findOne({ email });
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

export const getCustomerProfile = async (req: Request, res: Response) => {
  const customerProfile = await customerModel.findById(req.user._id);
  if (!customerProfile) {
    res.status(404).json({ message: "User Not Found" });
  } else {
    res.status(200).json({ message: customerProfile });
  }
};

export const editCustomerProfile = async (req: Request, res: Response) => {
  const { firstName, lastName, address, password } = <editCustomerProfileInput>(
    req.body
  );
  const customer = await customerModel.findById(req.user._id);
  if (!customer) {
    res.status(404).json({ message: "User Not Found" });
  } else {
    const match = bcrypt.compareSync(password, customer.password);
    if (!match) {
      res.status(401).json({ message: "Wrong Password" });
    } else {
      await customerModel.updateMany(
        { _id: req.user._id },
        { firstName, lastName, address }
      );
      res.status(200).json({ message: "Done !", customer });
    }
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const customer = req.user;
  if (customer) {
    const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
    const profile = await customerModel.findById(customer._id);
    const cart = <[OrderInputs]>req.body;
    let cartItems = Array();
    let netAmount = 0.0;
    const foods = await foodModel
      .find()
      .where("_id")
      .in(cart.map((item) => item._id))
      .exec();

    foods.map((food) => {
      cart.map(({ _id, unit }) => {
        if (food._id == _id) {
          netAmount += food.price * unit;
          cartItems.push({ food, unit });
        }
      });
    });
    if (cartItems) {
      const currentOrder = await orderModel.create({
        orderId: orderId,
        items: cartItems,
        totalAmount: netAmount,
      });
      if (currentOrder) {
        profile.orders.push(currentOrder);
        const profileResponse = await profile.save();
        return res.status(200).json(profileResponse);
      }
    }
  }
  return res.status(400).json({ message: "Error With Create Order" });
};
