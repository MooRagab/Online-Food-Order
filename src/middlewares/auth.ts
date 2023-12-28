import { Request, NextFunction, Response } from "express";
import { authPayload } from "../dto/auth.dto";
import { ValidateSignature } from "../services/signature";

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
