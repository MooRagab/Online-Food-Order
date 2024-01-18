import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import {
  CreateFoodInput,
  CreateOfferInputs,
  VendorLoginInputs,
  editVendorInput,
} from "../dto";
import { vendorModel, foodModel, orderModel } from "../DB/models";
import jwt from "jsonwebtoken";
import Cloudinary from "../services/Cloudinary";
import { offerModel } from "../DB/models/Offer.model";

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

//ORDERS

// ------------------------------------Get Current Order--------------------------------------

export const getCurrentOrders = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    const orders = await orderModel
      .find({ vendorId: user._id })
      .populate("items.food");

    if (orders != null) {
      return res.status(200).json(orders);
    }
  }
  return res.status(404).json({ message: "Orders Not found" });
};

// ------------------------------------Get Order Details--------------------------------------

export const getOrderDetails = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  if (orderId) {
    const order = await orderModel.findById(orderId).populate("items.food");

    if (!order) {
      return res.status(404).json({ message: "Order Not found" });
    } else {
      return res.status(200).json(order);
    }
  }
};

// ------------------------------------Edits On Order--------------------------------------

export const processOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const { status, remarks, time } = req.body;

  if (orderId) {
    const order = await orderModel.findById(orderId).populate("items.food");

    order.orderStatus = status;
    order.remarks = remarks;
    if (time) {
      order.readyTime = time;
    }

    const orderResult = await order.save();

    if (orderResult != null) {
      return res.status(200).json(orderResult);
    }
  }

  return res.json({ message: "Unable to process order" });
};

//OFFERS

// ------------------------------------Add Offer--------------------------------------

export const addOffer = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    const {
      title,
      description,
      offerType,
      offerAmount,
      pincode,
      promocode,
      startValidity,
      endValidity,
      minValue,
      isActive,
    } = <CreateOfferInputs>req.body;

    const vendor = await vendorModel.findById(user._id);

    if (vendor) {
      const offer = await offerModel.create({
        title,
        description,
        offerType,
        offerAmount,
        pincode,
        startValidity,
        endValidity,
        isActive,
        minValue,
        vendor: [vendor],
      });

      console.log(offer);

      return res.status(200).json(offer);
    }
  }

  return res.json({ message: "Unable to add Offer!" });
};

// ------------------------------------Get Offers--------------------------------------

export const getOffers = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    let currentOffer = Array();

    const offers = await offerModel.find().populate("vendors");

    if (offers) {
      offers.map((item) => {
        if (item.vendors) {
          item.vendors.map((vendor) => {
            if (vendor._id.toString() === user._id) {
              currentOffer.push(item);
            }
          });
        }

        if (item.offerType === "GENERIC") {
          currentOffer.push(item);
        }
      });
    }

    return res.status(200).json(currentOffer);
  }

  return res.json({ message: "Offers Not available" });
};

// ------------------------------------Edits Offers--------------------------------------

export const editOffer = async (req: Request, res: Response) => {
  const user = req.user;
  const offerId = req.params.id;

  if (user) {
    const {
      title,
      description,
      offerType,
      offerAmount,
      pincode,
      promocode,
      startValidity,
      endValidity,
      minValue,
      isActive,
    } = <CreateOfferInputs>req.body;

    const currentOffer = await offerModel.findById(offerId);

    if (currentOffer) {
      const vendor = await vendorModel.findById(user._id);

      if (vendor) {
        (currentOffer.title = title),
          (currentOffer.description = description),
          (currentOffer.offerType = offerType),
          (currentOffer.offerAmount = offerAmount),
          (currentOffer.pincode = pincode),
          (currentOffer.startValidity = startValidity),
          (currentOffer.endValidity = endValidity),
          (currentOffer.isActive = isActive),
          (currentOffer.minValue = minValue);

        const result = await currentOffer.save();

        return res.status(200).json(result);
      }
    }
  }

  return res.json({ message: "Unable to add Offer!" });
};
