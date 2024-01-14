import { NextFunction, Request, Response } from "express";
import vendorModel from "../DB/models/Vendor.model";
import { FoodDoc } from "../DB/models";

// ------------------------------------Food Availability--------------------------------------

export const getFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;
  const result = await vendorModel
    .find({
      pincode: pincode,
      serviceAvailable: true,
    })
    .sort([["rating", "descending"]])
    .populate([
      {
        path: "foods",
      },
    ]);
  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Data Not Found!" });
  }
};

// ------------------------------------Top Restaurants--------------------------------------

export const getTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;
  const result = await vendorModel
    .find({
      pincode: pincode,
      serviceAvailable: true,
    })
    .sort([["rating", "descending"]])
    .limit(10);
  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Data Not Found!" });
  }
};

// ----------------------------------Foods In 30min------------------------------------

export const getFoodsIn30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;

  const result = await vendorModel
    .find({ pincode: pincode, serviceAvailable: true })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (result.length > 0) {
    let foodResult: any = [];
    result.map((vendor) => {
      const foods = vendor.foods as [FoodDoc];
      foodResult.push(...foods.filter((food) => food.readyTime <= 30));
    });
    return res.status(200).json(foodResult);
  }

  return res.status(404).json({ message: "data Not found!" });
};

// ------------------------------------Search Foods--------------------------------------

export const searchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;
  const result = await vendorModel
    .find({
      pincode: pincode,
      serviceAvailable: true,
    })
    .populate("foods");

  if (result.length > 0) {
    let foodResult: any = [];
    result.map((item) => foodResult.push(...item.foods));
    return res.status(200).json(foodResult);
  }
  return res.status(404).json({ msg: "data Not found!" });
};

// ------------------------------------Restaurant By Id--------------------------------------

export const restaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await vendorModel.findById(id).populate("foods");
  if (!result) { 
    return res.status(404).json({ msg: "data Not found!" });
  } else {
    return res.status(200).json(result);
  }
};
