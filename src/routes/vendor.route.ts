import { Router } from "express";
import { vendorLogin, vendor, GetVendorProfile } from "../controllers/vendorController";
import { auth } from "../middlewares";

const router = Router();

router.get("/", vendor);
router.post("/login" ,vendorLogin)
router.get("/vendorProfile" ,auth(), GetVendorProfile)
export { router as vendorRoute };
  