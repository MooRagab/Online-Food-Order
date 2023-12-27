import jwt from "jsonwebtoken";
import vendorModel from "../DB/models/Vendor.model";
import { NextFunction, Request, Response } from "express";

// Extend Request type to include a user property
interface AuthRequest extends Request {
  user?: any; // Adjust the type according to your user model
}

export const auth = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization?.startsWith(process.env.BEARERKEY)) {
        res.status(400).json({ message: "In-Valid Bareaer Key" });
      } else {
        const token = authorization.split(process.env.BEARERKEY)[1];
        const decoded = jwt.verify(token, process.env.SIGNINTOKEN) as any;
        if (!decoded?.id) {
          res.status(400).json({ message: "Invalid token payload" });
        } else {
          const user = await vendorModel
            .findById(decoded.id)
            .select("userName email profilePic role");
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
    }
  };
};
