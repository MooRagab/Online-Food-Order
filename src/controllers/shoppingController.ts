import { NextFunction, Request, Response } from "express";
import vendorModel from "../DB/models/Vendor.model";

export const getFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;
  const result = await vendorModel
    .find({
      pincode: pincode,
      serviceAvailable: true,
    })
    .sort([["rating", "descending"]])
    .populate("foods");
  if (result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ msg: "Data Not Found!" });
  }
};
