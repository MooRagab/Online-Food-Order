import { Router } from "express";
import {
  vendorLogin,
  vendor,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  addFood,
  getFood,
} from "../controllers/vendorController";
import { auth } from "../middlewares";
import { fileValidation, myMulter } from "../services/Multer";

const router = Router();

router.get("/", vendor);
router.post("/login", vendorLogin);
router.use(auth());
router.get("/vendorProfile", getVendorProfile);
router.patch("/updatevendorprofile", updateVendorProfile);
router.patch("/service", updateVendorService);
router.post("/addfood", myMulter(fileValidation as any).array("images", 5), addFood);
router.get("/vendorfood", getFood);

export { router as vendorRoute };
