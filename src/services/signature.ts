import { Request } from "express";
import jwt from "jsonwebtoken";
import { VendorPayload } from "../dto/vendor.dto";
import { authPayload } from "../dto";

export const GenerateSignature = async (payload: authPayload) => {
  return jwt.sign(payload, process.env.SIGNIN_TOKEN, { expiresIn: "90d" });
};

export const ValidateSignature = async (req: Request) => {
  const signature = req.get("Authorization");
  if (signature) {
    try {
      const payload = jwt.verify(
        signature.split(process.env.BEARER_KEY)[1],
        process.env.SIGNIN_TOKEN
      ) as authPayload;
      req.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};
