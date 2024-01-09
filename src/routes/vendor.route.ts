import { Router } from "express";
import {
  vendorLogin,
  vendor,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  addFood,
} from "../controllers/vendorController";
import { auth } from "../middlewares";

const router = Router();

router.get("/", vendor);
router.post("/login", vendorLogin);
router.use(auth());
router.get("/vendorProfile", getVendorProfile);
router.patch("/updatevendorprofile", updateVendorProfile);
router.patch("/service", updateVendorService);
router.post("/addfood", addFood);

export { router as vendorRoute };
