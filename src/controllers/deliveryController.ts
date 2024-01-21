import { NextFunction, Request, Response } from "express";
import { CreateDeliveryUserInput, editCustomerProfileInput } from "../dto";
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
      <a href = ${req.protocol}://${req.headers.host}/delivery/confirmEmail/${token}>Confirm Delivery Account</a>
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

export const deliveryLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await deliveryUserModel.findOne({ email });
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

export const getDeliveryProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deliveryUser = req.user;

  if (deliveryUser) {
    const profile = await deliveryUserModel.findById(deliveryUser._id);

    if (profile) {
      return res.status(201).json(profile);
    }
  }
  return res.status(400).json({ msg: "Error while Fetching Profile" });
};

export const editDeliveryProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, address, password } = <editCustomerProfileInput>(
    req.body
  );
  const customer = await deliveryUserModel.findById(req.user._id);
  if (!customer) {
    res.status(404).json({ message: "User Not Found" });
  } else {
    const match = bcrypt.compareSync(password, customer.password);
    if (!match) {
      res.status(401).json({ message: "Wrong Password" });
    } else {
      await deliveryUserModel.updateMany(
        { _id: req.user._id },
        { firstName, lastName, address }
      );
      res.status(200).json({ message: "Done !", customer });
    }
  }
};

export const updateDeliveryUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deliveryUser = req.user;

  if (deliveryUser) {
    const { lat, lng } = req.body;

    const profile = await deliveryUserModel.findById(deliveryUser._id);

    if (profile) {
      if (lat && lng) {
        profile.lat = lat;
        profile.lng = lng;
      }

      profile.isAvailable = !profile.isAvailable;

      const result = await profile.save();

      return res.status(201).json(result);
    }
  }
  return res.status(400).json({ msg: "Error while Updating Profile" });
};
