import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import vendorModel from "../DB/models/Vendor.model";
import { VendorPayload } from "../dto";

declare global {
  namespace Express {
    interface Request {
      user?: VendorPayload;
    }
  }
}
export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization?.startsWith(process.env.BEARER_KEY)) {
        res.status(400).json({ message: "In-Valid Bareaer Key" });
      } else {
        const token = authorization.split(process.env.BEARER_KEY)[1];
        const decoded = jwt.verify(token, process.env.SIGNIN_TOKEN) as any;
        if (!decoded?.id) {
          res.status(400).json({ message: "Invalid token payload" });
        } else {
          const user = await vendorModel
            .findById(decoded.id)
            .select("name email foodType");
          if (!user) {
            res.status(401).json({ message: "Not Register User" });
          } else {
            req.user = user;
            next();
          }
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Catch Error", error });
      //   console.log(error);
    }
  };
};
