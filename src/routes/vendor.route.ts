import { Router } from "express";
import {
  vendorLogin,
  vendor,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  addFood,
  getFood,
  addProfilePic,
} from "../controllers/vendorController";
import { auth } from "../middlewares";
import { fileValidation, myMulter } from "../services/Multer";

const router = Router();

router.get("/", vendor);
router.post("/login", vendorLogin);

router.use(auth());                 // Auth Middleware

router.get("/vendorProfile", getVendorProfile);
router.patch("/updatevendorprofile", updateVendorProfile);
router.get("/vendorfood", getFood);
router.patch("/service", updateVendorService);
router.post("/addfood", myMulter(fileValidation).array("images", 5), addFood);
router.post(
  "/profilepic",
  myMulter(fileValidation).single("image"),
  addProfilePic
);

export { router as vendorRoute };
