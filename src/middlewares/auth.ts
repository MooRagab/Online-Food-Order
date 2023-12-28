import { Request, NextFunction, Response } from "express";
import { authPayload } from "../dto";
import { ValidateSignature } from "../services";

declare global {
  namespace Express {
    interface Request {
      user?: authPayload;
    }
  }
}
export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = await ValidateSignature(req);
  if (signature) {
    return next();
  } else {
    return res.json({ message: "User Not Authorised" });
  }
};
