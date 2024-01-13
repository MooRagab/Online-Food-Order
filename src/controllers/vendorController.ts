import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { CreateFoodInput, VendorLoginInputs, editVendorInput } from "../dto";
import vendorModel from "../DB/models/Vendor.model";
import jwt from "jsonwebtoken";
import foodModel from "../DB/models/Food.model";
import Cloudinary from "../services/Cloudinary";

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

// ------------------------------------Add Profile Picture------------------------------------------

export const addProfilePic = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Pls Upload your profile Picture" });
    } else {
      const { secure_url } = await Cloudinary.uploader.upload(req.file.path, {
        folder: `Online-Food/${req.user._id}/profilePic`,
      });
      await vendorModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          profilePic: secure_url,
        }
      );
      res.status(200).json({ message: "Done" });
    }
  } catch (error) {
    res.status(500).json({ message: "Catch Error", error });
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
  try {
    const vendor = await vendorModel.findById(req.user._id);
    if (!vendor) {
      return res.status(400).json({ message: "Unable To Add Food" });
    }
    if (!req.files.length) {
      res
        .status(400)
        .json({ message: "You Must upload some images for your food" });
    } else {
      const { name, description, category, foodType, readyTime, price } = <
        CreateFoodInput
      >req.body;
      const images = [];
      const imagePublicIds = [];
      for (const file of req.files as [Express.Multer.File]) {
        const { secure_url, public_id } = await Cloudinary.uploader.upload(
          file.path,
          {
            folder: `Online-Food/food/${name}`,
          }
        );
        images.push(secure_url);
        imagePublicIds.push(public_id);
      }
      const food = await foodModel.create({
        images,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        readyTime: readyTime,
        price: price,
        addedBy: req.user._id,
        imagePublicIds,
      });
      vendor.foods.push(food);
      await vendor.save();
      return res.status(200).json({ message: "food", food: food });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

// ------------------------------------Get Food--------------------------------------

export const getFood = async (req: Request, res: Response) => {
  try {
    const getFood = await foodModel.find({ vendorId: req.user._id });
    if (getFood == null) {
      return res.status(404).json({ message: "This User have no foods yet" });
    } else {
      return res.status(200).json({ message: "Done", getFood });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

