import { NextFunction, Request, Response, Router } from "express";

import {
  createVendor,
  getVendors,
  getVendorById,
  confirmEmail,
  getTransactions,
  getTransactionById,
} from "../controllers";

const router = Router();

/* ------------------- Signup / Create Vendor --------------------- */
router.post("/vendor", createVendor);

/* ------------------- Get Vendors --------------------- */
router.get("/vendors", getVendors);

/* ------------------- Get Vendor By ID --------------------- */
router.get("/vendor/:id", getVendorById);

/* ------------------- Confirm Email --------------------- */
router.get("/confirmEmail/:token", confirmEmail);

/* ------------------- Get Transactions --------------------- */
router.get("/transactions", getTransactions);

/* ------------------- Get Transactions By Id --------------------- */
router.get("/transaction/:id", getTransactionById);

export { router as adminRoute };
 