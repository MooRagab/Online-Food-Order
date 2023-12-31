import { NextFunction, Request, Response, Router } from "express";

import {
  createVendor,
  getVendors,
  getVendorById,
  confirmEmail,
} from "../controllers/adminController";

const router = Router();

router.post("/vendor", createVendor);
router.get("/vendors", getVendors);
router.get("/vendor/:id", getVendorById);
router.get("/confirmEmail/:token", confirmEmail);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Admin" });
});

export { router as adminRoute };
